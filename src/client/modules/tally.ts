/**
 * Tally (inter-page preloader + guarded height flow)
 *
 * - Shows preloader only BETWEEN PAGES (not on initial open).
 * - On page change: collapse one tick + fade iframe ("stealth"), show preloader.
 * - Applies height from iFrameResizer STRING messages and JSON payloads.
 * - Cancels provisional timer once real height arrives to prevent overwrite.
 * - Hides preloader after first height (honouring minPreloaderMs).
 *
 * @author <cabal@digerati.design>
 */

import { eventBus } from "$digerati/events";
import {
    autoGroup,
    log,
    warn,
    error as logError,
} from "$digerati/utils/logger";
import { normalizeHexColor } from "../utils/color";

const SELECTORS = {
    trigger: "[dd-tally-form-id]",
    modal: '[dd-tally="modal"]',
    close: '[dd-tally="close"]',
    preloader: '[dd-tally="preloader"]',
    iframe: '[dd-tally="iframe"]',
};

// --------------------------------------
// Config
// --------------------------------------
const SHOW_PRELOADER_ON_OPEN = false;        // keep false – user only wants between pages
const SHOW_PRELOADER_BETWEEN_PAGES = true;   // preloader during inter-page transitions
const PROVISIONAL_DELAY_MS = 120;            // delay before provisional height kicks in

// Debug flags
const DEBUG_RESIZE = true;
const DEBUG_RESIZE_OBSERVER = false;

// --------------------------------------
// Debug helpers
// --------------------------------------
let _openedAt = 0;
let _lastCollapseAt = 0;

const dlog = (...args: any[]) => { if (DEBUG_RESIZE) log("[TallyDebug]", ...args); };
const since = (t0: number) => `${Math.round(performance.now() - t0)}ms`;
const snapshotHeights = (iframe: HTMLIFrameElement) => ({
    styleHeight: iframe.style.height || "(unset)",
    attrHeight: iframe.getAttribute("height") || "(unset)",
    offsetHeight: iframe.offsetHeight,
    clientHeight: iframe.clientHeight,
});

// --------------------------------------
// State per-iframe to control races
// --------------------------------------
type CycleState = {
    cycleStartedAt: number;          // time this page-view cycle started
    lastHeightAt: number;            // time of last real height in this cycle
    provisionalTimer: number | null; // pending timer id (if any)
    preloaderShownAt: number | null; // timestamp when between-page preloader shown
};
const stateByIframe = new WeakMap<HTMLIFrameElement, CycleState>();
const getOrInitState = (iframe: HTMLIFrameElement): CycleState => {
    let s = stateByIframe.get(iframe);
    if (!s) {
        s = { cycleStartedAt: 0, lastHeightAt: 0, provisionalTimer: null, preloaderShownAt: null };
        stateByIframe.set(iframe, s);
    }
    return s;
};

// --------------------------------------
// Preloader helpers
// --------------------------------------
const buildGrid = (container: HTMLElement, N = 11, mode = "random"): void => {
    const modes: Record<string, (r: number, c: number) => number> = {
        topRight: (r, c) => Math.hypot(r, N - 1 - c),
        topLeft: (r, c) => Math.hypot(r, c),
        bottomLeft: (r, c) => Math.hypot(N - 1 - r, c),
        bottomRight: (r, c) => Math.hypot(N - 1 - c, N - 1 - r),
        vertical: (r) => r,
        horizontal: (_, c) => c,
        spiral: (r, c) => ((r + c) % N) + Math.floor((r + c) / N) * N,
        random: () => Math.random() * N * N,
    };
    container.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "grid";
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const fn = modes[mode] || modes.random;
            const d = fn(r, c).toFixed(3);
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.setProperty("--d", d);
            grid.appendChild(cell);
        }
    }
    container.appendChild(grid);
};
const pickRandomMode = () =>
    ["topRight", "topLeft", "bottomLeft", "bottomRight", "vertical", "horizontal", "spiral", "random"][
    Math.floor(Math.random() * 8)
    ];

const showPreloader = (preloader: HTMLElement): number => {
    preloader.style.display = "flex";
    preloader.style.opacity = "1";
    preloader.style.transition = "";
    buildGrid(preloader, 11, pickRandomMode());
    eventBus.emit("tally:preloader:show");
    dlog("Preloader SHOW");
    return performance.now();
};

const hidePreloader = (preloader: HTMLElement, shownAt: number, minPreloaderMs: number): void => {
    const elapsed = performance.now() - shownAt;
    const remaining = Math.max(0, minPreloaderMs - elapsed);
    setTimeout(() => {
        preloader.style.transition = "opacity 0.4s ease";
        preloader.style.opacity = "0";
        const cleanup = () => {
            preloader.style.display = "none";
            preloader.style.transition = "";
            preloader.innerHTML = "";
            preloader.removeEventListener("transitionend", cleanup);
            eventBus.emit("tally:preloader:hide");
            dlog("Preloader HIDE", { elapsed: `${Math.round(elapsed)}ms` });
        };
        preloader.addEventListener("transitionend", cleanup, { once: true });
    }, remaining);
};

// --------------------------------------
// Main
// --------------------------------------
export const tally = (minPreloaderMs: number = 1000): void => {
    autoGroup("Tally Init", () => {
        const triggers = document.querySelectorAll<HTMLElement>(SELECTORS.trigger);
        const modals = document.querySelectorAll<HTMLElement>(SELECTORS.modal);

        log("Found Tally elements", { triggers: triggers.length, modals: modals.length });
        if (!triggers.length || !modals.length) {
            warn("No Tally triggers or modals found; aborting init.");
            return;
        }

        const getActiveModal = (): HTMLElement | null =>
            document.querySelector<HTMLElement>(`${SELECTORS.modal}.is-active`) ?? null;

        const getActiveIframe = (): HTMLIFrameElement | null =>
            getActiveModal()?.querySelector<HTMLIFrameElement>(SELECTORS.iframe) ?? null;

        // Colour cycle control
        const lockColourCycle = (accentHex?: string | null): void => {
            if (accentHex) {
                eventBus.emit("tally:accent:lock", { hex: accentHex });
                eventBus.emit("faviconHueRotateStepped:locked", { hex: accentHex });
                log("Colour cycling locked with accent", { accentHex });
            } else {
                eventBus.emit("tally:accent:lock");
                eventBus.emit("faviconHueRotateStepped:locked");
                log("Colour cycling locked (neutral)");
            }
        };
        const releaseColourCycle = (): void => {
            eventBus.emit("tally:accent:release");
            eventBus.emit("faviconHueRotateStepped:released");
            log("Colour cycling released");
        };

        // Stealth collapse and helpers
        const collapseOneTickStealth = (iframe: HTMLIFrameElement): void => {
            const before = snapshotHeights(iframe);
            const old = iframe.style.height;
            iframe.style.transition = "none";
            iframe.style.minHeight = "0";
            iframe.style.opacity = "0"; // hide while snapping
            iframe.style.height = "0px";
            _lastCollapseAt = performance.now();
            dlog("[collapseOneTick] → 0px & fade", { before });

            requestAnimationFrame(() => {
                iframe.style.height = old;
                const after = snapshotHeights(iframe);
                dlog("[collapseOneTick] restored old (still faded)", { old: old || "(unset)", after });
            });
        };

        const applyProvisionalHeight = (iframe: HTMLIFrameElement): void => {
            // Guard inside too (belt & braces)
            const s = getOrInitState(iframe);
            if (s.lastHeightAt > 0 && s.lastHeightAt > s.cycleStartedAt) {
                dlog("[provisionalHeight] SKIP (height already applied)");
                return;
            }
            const px = Math.min(window.innerHeight, 480) + "px";
            const before = snapshotHeights(iframe);
            iframe.style.height = px;
            const after = snapshotHeights(iframe);
            dlog("[provisionalHeight] applied", {
                px, before, after, sinceCollapse: since(_lastCollapseAt), sinceOpen: since(_openedAt)
            });
        };

        const revealIframe = (iframe: HTMLIFrameElement): void => {
            requestAnimationFrame(() => {
                iframe.style.opacity = "1";
                dlog("[revealIframe] opacity→1", snapshotHeights(iframe));
            });
        };

        // Modal lifecycle
        const hideAllModals = (): void => {
            modals.forEach((m) => {
                // cancel any pending delayed preloader (we don't use it on open, but cleanup anyway)
                if ((m as any)._preloaderTimer) {
                    clearTimeout((m as any)._preloaderTimer);
                    delete (m as any)._preloaderTimer;
                }
                const ro = (m as any)._dbgRO as ResizeObserver | undefined;
                if (ro) { ro.disconnect(); delete (m as any)._dbgRO; }

                m.style.display = "none";
                m.classList.remove("is-active");
            });
        };

        const openModal = (id: string, accentHex?: string | null): void => {
            autoGroup("Open Tally Modal", () => {
                const modal = document.getElementById(id);
                if (!modal || modal.getAttribute("dd-tally") !== "modal") {
                    logError("No Tally modal found with ID:", id);
                    eventBus.emit("tally:error", { reason: "missing-modal", id });
                    return;
                }

                const preloader = modal.querySelector<HTMLElement>(SELECTORS.preloader);
                const iframeEl = modal.querySelector<HTMLIFrameElement>(SELECTORS.iframe);

                hideAllModals();
                modal.style.display = "block";
                modal.classList.add("is-active");
                document.body.classList.add("no-scroll");
                _openedAt = performance.now();

                if (iframeEl) {
                    iframeEl.style.willChange = "height, opacity";
                    iframeEl.style.transition = "opacity 120ms ease, height 0s";
                    iframeEl.style.minHeight = "0";
                    iframeEl.style.opacity = "1";
                    iframeEl.style.display = "block";
                    iframeEl.style.width = "100%";
                    iframeEl.style.border = "0";
                }

                lockColourCycle(accentHex);
                eventBus.emit("tally:open", { id, accentHex });
                log("Opened modal", { id, accentHex });

                // Preloader on OPEN? (kept off per request)
                if (SHOW_PRELOADER_ON_OPEN && preloader) {
                    const shownAt = showPreloader(preloader);
                    (modal as any)._preloaderShownAt = shownAt;
                }

                const closeBtn = modal.querySelector<HTMLElement>(SELECTORS.close);
                if (closeBtn) closeBtn.addEventListener("click", () => closeModal(modal), { once: true });

                const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(modal); };
                document.addEventListener("keydown", handleKey, { once: true });

                if (DEBUG_RESIZE_OBSERVER && iframeEl) {
                    let prev = iframeEl.offsetHeight;
                    const ro = new ResizeObserver(() => {
                        const now = iframeEl.offsetHeight;
                        if (now !== prev) {
                            dlog("[RO] iframe offsetHeight change", {
                                from: prev, to: now, sinceCollapse: since(_lastCollapseAt), sinceOpen: since(_openedAt)
                            });
                            prev = now;
                        }
                    });
                    ro.observe(iframeEl);
                    (modal as any)._dbgRO = ro;
                }
            });
        };

        const closeModal = (modal: HTMLElement): void => {
            autoGroup("Close Tally Modal", () => {
                // cancel delayed preloader if any
                if ((modal as any)._preloaderTimer) {
                    clearTimeout((modal as any)._preloaderTimer);
                    delete (modal as any)._preloaderTimer;
                }

                const preloader = modal.querySelector<HTMLElement>(SELECTORS.preloader);
                if (preloader) {
                    preloader.style.display = "none";
                    preloader.style.opacity = "0";
                    preloader.innerHTML = "";
                    eventBus.emit("tally:preloader:hide");
                }

                const ro = (modal as any)._dbgRO as ResizeObserver | undefined;
                if (ro) { ro.disconnect(); delete (modal as any)._dbgRO; }

                modal.style.display = "none";
                modal.classList.remove("is-active");
                document.body.classList.remove("no-scroll");

                releaseColourCycle();
                eventBus.emit("tally:close", { id: modal.id });
                log("Closed modal", { id: modal.id });
            });
        };

        // Message handling
        window.addEventListener("message", (event) => {
            // Only trust tally.so
            try {
                const host = new URL(event.origin).hostname;
                if (!/(\.|^)tally\.so$/i.test(host)) return;
            } catch { return; }

            const raw = event.data;
            let data: any = raw;
            if (typeof raw === "string") {
                try { data = JSON.parse(raw); } catch { /* string is fine (iFrameResizer) */ }
            }

            log("Tally message received (parsed)", data);

            const iframe = getActiveIframe();
            if (!iframe) return;

            // --- PAGE VIEW: start a guarded cycle
            if (
                data?.type === "tally:page-view" ||
                data?.event === "Tally.FormPageView" ||
                data?.event === "Tally.PageView" ||
                data?.event === "Tally.PageChange"
            ) {
                dlog("[page-view] collapse");
                collapseOneTickStealth(iframe);

                const s = getOrInitState(iframe);
                s.cycleStartedAt = performance.now();
                s.lastHeightAt = 0;

                // Inter-page preloader
                const modal = getActiveModal();
                const pre = modal?.querySelector<HTMLElement>(SELECTORS.preloader);
                if (SHOW_PRELOADER_BETWEEN_PAGES && pre) {
                    s.preloaderShownAt = showPreloader(pre);
                    dlog("[page-view] inter-page preloader SHOW");
                } else {
                    s.preloaderShownAt = null;
                }

                // Guarded provisional height
                if (s.provisionalTimer) {
                    clearTimeout(s.provisionalTimer);
                    s.provisionalTimer = null;
                }
                s.provisionalTimer = window.setTimeout(() => {
                    if (s.lastHeightAt > 0 && s.lastHeightAt > s.cycleStartedAt) {
                        dlog("[page-view] provisional SKIPPED (real height already applied)", {
                            sinceCollapse: since(_lastCollapseAt),
                            sinceHeight: since(s.lastHeightAt),
                        });
                        return;
                    }
                    dlog("[page-view] provisional height timeout @", since(_lastCollapseAt));
                    applyProvisionalHeight(iframe);
                }, PROVISIONAL_DELAY_MS);

                return;
            }

            // --- iFrameResizer STRING messages
            if (typeof raw === "string") {
                if (/\[iFrameResizerChild\]Ready/i.test(raw)) {
                    dlog("[iFrameResizer] Ready (no height yet)");
                    return;
                }
                const m =
                    raw.match(/iFrameResizer\d+:(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):([a-zA-Z]+)/i) ||
                    raw.match(/iFrameSizer\]iFrameResizer\d+:(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):([a-zA-Z]+)/i);

                if (m) {
                    const h = Math.ceil(Number(m[1] || 0));
                    const w = Math.ceil(Number(m[2] || 0));
                    const kind = m[3] || "(unknown)";
                    dlog("[iFrameResizer] parsed", { height: h, width: w, kind, sinceCollapse: since(_lastCollapseAt), sinceOpen: since(_openedAt) });

                    if (h > 0) {
                        const s = getOrInitState(iframe);
                        s.lastHeightAt = performance.now();
                        if (s.provisionalTimer) {
                            clearTimeout(s.provisionalTimer);
                            s.provisionalTimer = null;
                            dlog("[height] cancelled provisional timer");
                        }

                        const before = snapshotHeights(iframe);
                        const px = `${h}px`;
                        iframe.style.height = px;
                        const after = snapshotHeights(iframe);
                        dlog("[height→apply] (iFrameResizer)", { px, before, after });

                        // Reveal (we faded during collapse)
                        revealIframe(iframe);

                        // Hide between-page preloader
                        const modal = getActiveModal();
                        const pre = modal?.querySelector<HTMLElement>(SELECTORS.preloader);
                        if (pre && s.preloaderShownAt != null) {
                            hidePreloader(pre, s.preloaderShownAt, minPreloaderMs);
                            dlog("[height] inter-page preloader HIDE");
                            s.preloaderShownAt = null;
                        }
                    }
                    return; // handled string case
                } else {
                    dlog("[iFrameResizer] string (no match)", raw);
                    // fall through: maybe other non-height string
                }
            }

            // --- JSON height variants
            const heightVal =
                (typeof data?.payload === "number" && data.payload) ||
                (typeof data?.height === "number" && data.height) ||
                (typeof data?.payload?.height === "number" && data.payload.height) ||
                (typeof data?.payload?.documentHeight === "number" && data.payload.documentHeight) ||
                null;

            if (heightVal != null) {
                const s = getOrInitState(iframe);
                s.lastHeightAt = performance.now();
                if (s.provisionalTimer) {
                    clearTimeout(s.provisionalTimer);
                    s.provisionalTimer = null;
                    dlog("[height] cancelled provisional timer");
                }

                const before = snapshotHeights(iframe);
                const px = Math.max(0, Number(heightVal)) + "px";
                iframe.style.height = px;
                const after = snapshotHeights(iframe);
                dlog("[height→apply] (JSON)", { px, before, after, sinceCollapse: since(_lastCollapseAt), sinceOpen: since(_openedAt) });

                revealIframe(iframe);

                const modal = getActiveModal();
                const pre = modal?.querySelector<HTMLElement>(SELECTORS.preloader);
                if (pre && s.preloaderShownAt != null) {
                    hidePreloader(pre, s.preloaderShownAt, minPreloaderMs);
                    dlog("[height] inter-page preloader HIDE");
                    s.preloaderShownAt = null;
                }
            }

            // --- Submission label tweak (kept)
            if (data?.event === "Tally.FormSubmitted" && data?.payload) {
                const activeModal = getActiveModal();
                const closeBtn = activeModal?.querySelector<HTMLElement>(SELECTORS.close);
                const textEl = closeBtn?.querySelector<HTMLElement>(".button-text-50.is-default");
                if (textEl) textEl.textContent = "Close";
                else if (closeBtn) closeBtn.textContent = "Close";
                eventBus.emit("tally:form:submitted", data.payload);
                dlog("[submitted] set close label → 'Close'");
            }
        });

        // Trigger click handling
        document.body.addEventListener("click", (e) => {
            const target = (e.target as HTMLElement).closest(SELECTORS.trigger);
            if (!target) return;

            e.preventDefault();

            const formId = target.getAttribute("dd-tally-form-id");
            const accentAttr = target.getAttribute("dd-tally-accent");
            const accentHex = normalizeHexColor(accentAttr);

            if (!formId) {
                warn("Trigger missing dd-tally-form-id attribute");
                return;
            }

            openModal(formId, accentHex);
        });

        // Auto-open via URL
        const params = new URLSearchParams(window.location.search);
        const formId = params.get("formId");
        const accentParam = params.get("accent");

        if (formId) {
            const accentHex = normalizeHexColor(accentParam);
            log("Tally auto-open from URL params", { formId, accentHex });

            window.addEventListener("DOMContentLoaded", () => {
                setTimeout(() => {
                    openModal(formId, accentHex);
                }, 150);
            });
        }

        eventBus.emit("tally:initialized");
        log("Tally initialized successfully");
    });
};
