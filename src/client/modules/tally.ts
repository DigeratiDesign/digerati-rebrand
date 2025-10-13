/**
 * Tally
 *
 * Opens per-ID Tally form modals with local preloaders.
 * Each preloader shows an animated dot grid while waiting for Tally iframe height.
 * Locks colour cycling (accent-aware) while open.
 * Supports URL params: ?formId=XXX&accent=XXX
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

export const tally = (minPreloaderMs: number = 1000): void => {
    autoGroup("Tally Init", () => {
        const triggers = document.querySelectorAll<HTMLElement>(SELECTORS.trigger);
        const modals = document.querySelectorAll<HTMLElement>(SELECTORS.modal);

        log("Found Tally elements", {
            triggers: triggers.length,
            modals: modals.length,
        });

        if (!triggers.length || !modals.length) {
            warn("No Tally triggers or modals found; aborting init.");
            return;
        }

        // ---- Grid animation helpers ----
        const N = 11;
        const modes: Record<string, (r: number, c: number) => number> = {
            topRight: (r, c) => Math.hypot(r, N - 1 - c),
            topLeft: (r, c) => Math.hypot(r, c),
            bottomLeft: (r, c) => Math.hypot(N - 1 - r, c),
            bottomRight: (r, c) => Math.hypot(N - 1 - c, N - 1 - r),
            vertical: (r) => r,
            horizontal: (_, c) => c,
            spiral: (r, c) => ((r + c) % N) + Math.floor((r + c) / N) * N,
        };

        const modeNames = Object.keys(modes);
        const pickRandomMode = () =>
            modeNames[Math.floor(Math.random() * modeNames.length)];

        const buildGrid = (container: HTMLElement, mode: string): void => {
            container.innerHTML = "";
            const grid = document.createElement("div");
            grid.className = "grid";
            for (let r = 0; r < N; r++) {
                for (let c = 0; c < N; c++) {
                    const fn = modes[mode];
                    const d = fn ? fn(r, c).toFixed(3) : "0";
                    const cell = document.createElement("div");
                    cell.className = "cell";
                    cell.style.setProperty("--d", d);
                    grid.appendChild(cell);
                }
            }
            container.appendChild(grid);
        };

        // ---- Colour cycling control ----
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

        // ---- Preloader show/hide ----
        const showPreloader = (preloader: HTMLElement): number => {
            preloader.style.display = "flex"; // keep centered
            preloader.style.opacity = "1";
            preloader.style.transition = "";
            const mode = pickRandomMode();
            buildGrid(preloader, mode);
            eventBus.emit("tally:preloader:show", { mode });
            log("Preloader shown", { mode });
            return performance.now();
        };

        const hidePreloader = (preloader: HTMLElement, shownAt: number): void => {
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
                    log("Preloader hidden");
                };

                preloader.addEventListener("transitionend", cleanup, { once: true });
            }, remaining);
        };

        const waitForIframeHeight = (
            iframe: HTMLIFrameElement,
            preloader: HTMLElement,
            shownAt: number
        ): void => {
            const check = (): void => {
                const hAttr = iframe.getAttribute("height");
                const styleH = iframe.style.height;
                const heightValue =
                    (hAttr && parseInt(hAttr)) || (styleH && parseInt(styleH));
                if (heightValue && heightValue > 0) {
                    hidePreloader(preloader, shownAt);
                } else {
                    requestAnimationFrame(check);
                }
            };
            requestAnimationFrame(check);
        };

        // ---- Modal logic ----
        const hideAllModals = (): void => {
            modals.forEach((m) => {
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

                hideAllModals();
                modal.style.display = "block";
                modal.classList.add("is-active");
                document.body.classList.add("no-scroll");

                lockColourCycle(accentHex);
                eventBus.emit("tally:open", { id, accentHex });
                log("Opened modal", { id, accentHex });

                // --- Preloader always shows for at least minPreloaderMs ---
                if (preloader) {
                    const shownAt = showPreloader(preloader);
                    log(`Showing preloader for ${minPreloaderMs}ms`);
                    setTimeout(() => hidePreloader(preloader, shownAt), minPreloaderMs);
                }

                const closeBtn = modal.querySelector<HTMLElement>(SELECTORS.close);
                if (closeBtn) {
                    closeBtn.addEventListener("click", () => closeModal(modal), { once: true });
                }

                const handleKey = (e: KeyboardEvent) => {
                    if (e.key === "Escape") closeModal(modal);
                };
                document.addEventListener("keydown", handleKey, { once: true });
            });
        };


        const closeModal = (modal: HTMLElement): void => {
            autoGroup("Close Tally Modal", () => {
                const preloader = modal.querySelector<HTMLElement>(SELECTORS.preloader);
                // const iframe = modal.querySelector<HTMLIFrameElement>(SELECTORS.iframe);

                if (preloader) {
                    preloader.style.display = "none";
                    preloader.style.opacity = "0";
                    preloader.innerHTML = "";
                    eventBus.emit("tally:preloader:hide");
                }

                // ❌ Do not clear iframe.src — we keep the same form instance

                modal.style.display = "none";
                modal.classList.remove("is-active");
                document.body.classList.remove("no-scroll");

                releaseColourCycle();
                eventBus.emit("tally:close", { id: modal.id });
                log("Closed modal", { id: modal.id });
            });
        };

        // ---- Listen for Tally form submission (inside iframe) ----
        window.addEventListener("message", (event) => {
            if (!event.origin.includes("tally.so")) return;

            let data = event.data;

            if (typeof data === "string") {
                try {
                    data = JSON.parse(data);
                } catch {
                    return;
                }
            }

            log("Tally message received (parsed)", data);

            if (data?.event === "Tally.FormSubmitted" && data?.payload) {
                const payload = data.payload;
                log("🎉 Tally form submitted:", payload);

                const activeModal = document.querySelector<HTMLElement>(
                    `${SELECTORS.modal}.is-active`
                );
                const closeBtn = activeModal?.querySelector<HTMLElement>(SELECTORS.close);
                const textEl = closeBtn?.querySelector<HTMLElement>(
                    ".button-text-50.is-default"
                );

                log("🔍 Lookup results", {
                    activeModalFound: !!activeModal,
                    closeBtnFound: !!closeBtn,
                    textElFound: !!textEl,
                });

                if (textEl) {
                    log("🔍 Current label text before change:", textEl.textContent?.trim());
                    textEl.textContent = "Close";
                    log("✅ Updated label text after change:", textEl.textContent?.trim());
                } else if (closeBtn) {
                    log("🔍 Current button text before change:", closeBtn.textContent?.trim());
                    closeBtn.textContent = "Close";
                    log("✅ Updated button text after change:", closeBtn.textContent?.trim());
                } else {
                    warn("⚠️ No close button or text element found inside modal");
                }

                eventBus.emit("tally:form:submitted", payload);
            }
        });

        // ---- Reset close button label when modal closes ----
        eventBus.on("tally:close", ({ id }) => {
            const modal = document.getElementById(id);
            const closeBtn = modal?.querySelector<HTMLElement>(SELECTORS.close);
            const textEl = closeBtn?.querySelector<HTMLElement>(".button-text-50.is-default");

            log("🔄 Resetting close button label", {
                modalFound: !!modal,
                closeBtnFound: !!closeBtn,
                textElFound: !!textEl,
            });

            if (textEl) {
                log("🔍 Current label text before reset:", textEl.textContent?.trim());
                textEl.textContent = "Abort";
                log("✅ Label reset to:", textEl.textContent?.trim());
            } else if (closeBtn) {
                log("🔍 Current button text before reset:", closeBtn.textContent?.trim());
                closeBtn.textContent = "Abort";
                log("⚠️ Fallback reset applied on button directly");
            } else {
                warn("⚠️ No close button or label element found while resetting");
            }
        });

        // ---- Trigger click handling ----
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

            // ✅ iframe already has its src set in markup, no need to reassign
            openModal(formId, accentHex);
        });

        // --- Auto-open if URL contains formId and optional accent ---
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