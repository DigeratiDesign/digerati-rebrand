/**
 * Tally
 *
 * Handles opening a Tally.so iframe modal with a fancy preloader,
 * accessibility focus trapping, and robust fallbacks.
 *
 * Emits structured events and logs for observability.
 *
 * Accent lock events still emit for hue control,
 * but preloader visuals remain neutral (no accent applied).
 *
 * Includes verbose logging for debugging hue event flow.
 *
 * @author <cabal@digerati.design>
 */
import { eventBus } from "$digerati/events";
import {
  autoGroup,
  error as logError,
  log,
  time,
  timeEnd,
} from "$digerati/utils/logger";
import { normalizeHexColor } from "../utils/color";

const SELECTORS = {
  modal: '[dd-tally="modal"]',
  close: '[dd-tally="close"]',
  iframe: '[dd-tally="iframe"]',
  preloader: '[dd-tally="preloader"]',
  trigger: '[dd-tally="open"]',
  dots: '[dd-tally="dots"]',
};

interface TallyHandles {
  openModal: (url: string) => void;
  closeModal: () => void;
}

export const tally = (minPreloaderMs: number = 1500): TallyHandles => {
  let handles: TallyHandles = {
    openModal: (_: string) => { },
    closeModal: () => { },
  };

  autoGroup("Tally Init", () => {
    const modal = document.querySelector<HTMLElement>(SELECTORS.modal);
    const closeBtn = document.querySelector<HTMLElement>(SELECTORS.close);
    const iframe = document.querySelector<HTMLIFrameElement>(SELECTORS.iframe);
    const preloader = document.querySelector<HTMLElement>(SELECTORS.preloader);

    log("Tally found elements", {
      modal: !!modal,
      closeBtn: !!closeBtn,
      iframe: !!iframe,
      preloader: !!preloader,
    });

    if (!modal || !closeBtn || !iframe || !preloader) {
      logError("Missing required DOM elements; aborting tally initialization.");
      eventBus.emit("tally:init:error", { reason: "missing-dom-elements" });
      return;
    }

    // --- STATE ---
    let previousActiveElement: Element | null = null;
    let overallFallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeOutInProgress = false;
    let loadHandled = false;
    let preloaderShownAt = 0;
    let accentLockActive = false;
    let lockedHex: string | null = null;
    let hueGuardId: number | null = null;

    // --- PRELOADER GRID LOGIC ---
    const N = 11;
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
    const modeNames = Object.keys(modes);
    const pickRandomMode = () =>
      modeNames[Math.floor(Math.random() * modeNames.length)];

    const buildGrid = (container: HTMLElement, mode: string) => {
      container.innerHTML = "";
      container.style.display = "";
      container.style.opacity = "1";
      container.style.transition = "";
      const grid = document.createElement("div");
      grid.className = "grid";
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          const fn = modes[mode];
          const computed = typeof fn === "function" ? fn(r, c) : 0;
          const d = computed.toFixed(3);
          const cell = document.createElement("div");
          cell.className = "cell";
          cell.style.setProperty("--d", d);
          grid.appendChild(cell);
        }
      }
      container.appendChild(grid);
    };

    const showPreloader = () => {
      autoGroup("Show Preloader", () => {
        fadeOutInProgress = false;
        loadHandled = false;
        if (overallFallbackTimer) {
          clearTimeout(overallFallbackTimer);
          overallFallbackTimer = null;
        }

        preloader.style.display = "";
        preloader.style.opacity = "1";
        preloader.style.transition = "";
        preloaderShownAt = performance.now();

        const mode = pickRandomMode();
        log("Building preloader grid with mode:", mode);
        time("preloader:build");
        buildGrid(preloader, mode);
        timeEnd("preloader:build");

        eventBus.emit("tally:preloader:show", { mode });
      });
    };

    const hidePreloaderImmediate = () => {
      autoGroup("Hide Preloader Immediate", () => {
        preloader.innerHTML = "";
        preloader.style.transition = "";
        preloader.style.opacity = "";
        preloader.style.display = "none";
        fadeOutInProgress = false;
        if (overallFallbackTimer) {
          clearTimeout(overallFallbackTimer);
          overallFallbackTimer = null;
        }
        eventBus.emit("tally:preloader:hide", { method: "immediate" });
      });
    };

    const hidePreloaderWithJSFade = () => {
      autoGroup("Hide Preloader Fade", () => {
        if (fadeOutInProgress) return;
        fadeOutInProgress = true;

        preloader.style.display = "";
        preloader.style.opacity = "1";
        preloader.style.transition = "opacity .4s ease";
        requestAnimationFrame(() => (preloader.style.opacity = "0"));

        let localFallback: ReturnType<typeof setTimeout> | null = null;

        const cleanup = () => {
          if (localFallback) clearTimeout(localFallback);
          preloader.style.transition = "";
          preloader.style.opacity = "";
          preloader.style.display = "none";
          preloader.innerHTML = "";
          fadeOutInProgress = false;
          if (overallFallbackTimer) {
            clearTimeout(overallFallbackTimer);
            overallFallbackTimer = null;
          }
        };

        const onTransitionEnd = (e: TransitionEvent) => {
          if (e.propertyName === "opacity") {
            preloader.removeEventListener("transitionend", onTransitionEnd as any);
            cleanup();
            eventBus.emit("tally:preloader:hide", { method: "fade" });
          }
        };
        preloader.addEventListener("transitionend", onTransitionEnd as any);

        localFallback = window.setTimeout(() => {
          preloader.removeEventListener("transitionend", onTransitionEnd as any);
          cleanup();
          eventBus.emit("tally:preloader:hide", { method: "fade-fallback" });
        }, 600);
      });
    };

    const scheduleHideAfterMinDuration = () => {
      const elapsed = performance.now() - preloaderShownAt;
      const remaining = Math.max(0, minPreloaderMs - elapsed);
      remaining === 0
        ? hidePreloaderWithJSFade()
        : setTimeout(hidePreloaderWithJSFade, remaining);
    };

    const trapFocus = (e: KeyboardEvent) => {
      const focusableSelectors =
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
      const focusableEls = Array.from(
        modal.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter((el) => !el.hasAttribute("disabled"));
      if (!focusableEls.length) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      else trapFocus(e);
    };

    // ---- Recolour logic ----
    const recolourDotsLottie = (targetHex: string) => {
      const container = document.querySelector('[dd-tally="dots"] [dd-lottie]');
      if (!container) return;

      const svg = container.querySelector("svg");
      if (!svg) return;

      const [r, g, b] = targetHex
        .replace("#", "")
        .match(/.{1,2}/g)!
        .map((x) => parseInt(x, 16) / 255);

      svg.querySelectorAll("feColorMatrix").forEach((m, i) => {
        m.setAttribute(
          "values",
          `${r} 0 0 0 0
           0 ${g} 0 0 0
           0 0 ${b} 0 0
           0 0 0 1 0`
        );
        log(`[Tally:tint] Updated matrix #${i + 1}`, { r, g, b });
      });
    };

    const maintainDotsTint = (targetHex: string) => {
      const apply = () => recolourDotsLottie(targetHex);
      const id = setInterval(apply, 100);
      eventBus.once("tally:accent:release", () => clearInterval(id));
    };

    // ---- FORCE hue freeze guard (wins over any other script) ----
    const startHueFreezeGuard = () => {
      if (hueGuardId) clearInterval(hueGuardId);
      hueGuardId = window.setInterval(() => {
        document.documentElement.style.setProperty("--favicon-hue-deg", "0deg");
        document.querySelectorAll(".colour-cycle,[data-colour-cycle]").forEach((el) => {
          const elh = el as HTMLElement;
          elh.style.animationPlayState = "paused";
          elh.style.filter = "hue-rotate(0deg)";
        });
      }, 60);
      log("Hue freeze guard started");
    };

    const stopHueFreezeGuard = () => {
      if (hueGuardId) {
        clearInterval(hueGuardId);
        hueGuardId = null;
        log("Hue freeze guard stopped");
      }
      document.documentElement.style.removeProperty("--favicon-hue-deg");
      document.querySelectorAll(".colour-cycle,[data-colour-cycle]").forEach((el) => {
        const elh = el as HTMLElement;
        elh.style.animationPlayState = "";
        elh.style.filter = "";
      });
    };

    // ---- Unified accent lock/release helpers ----
    const lockAccent = (hex: string) => {
      lockedHex = hex;
      accentLockActive = true;
      eventBus.emit("tally:accent:lock", { hex });
      eventBus.emit("faviconHueRotateStepped:locked", { hex });
      startHueFreezeGuard(); // <- guarantees stop even if listener misses
      document.documentElement.style.setProperty("--favicon-hue-deg", "0deg");
      recolourDotsLottie(hex);
      maintainDotsTint(hex);
      log("Accent locked", { hex });
    };

    const releaseAccent = () => {
      if (!accentLockActive) return;
      eventBus.emit("tally:accent:release");
      eventBus.emit("faviconHueRotateStepped:released");
      stopHueFreezeGuard();
      accentLockActive = false;
      lockedHex = null;
      log("Accent released");
    };

    // ---- Modal logic ----
    const openModal = (url: string) => {
      autoGroup("Open Modal", () => {
        eventBus.emit("tally:open", { url });
        showPreloader();
        if (overallFallbackTimer) clearTimeout(overallFallbackTimer);
        loadHandled = false;

        const onLoad = () => {
          if (loadHandled) return;
          loadHandled = true;
          scheduleHideAfterMinDuration();
          log("Tally iframe loaded successfully for", url);
          eventBus.emit("tally:load:success", { url });
        };

        iframe.addEventListener("load", onLoad, { once: true });
        iframe.src = url;
        modal.classList.add("is-active");
        document.body.classList.add("no-scroll");
        modal.setAttribute("aria-hidden", "false");
        previousActiveElement = document.activeElement;
        setTimeout(() => closeBtn.focus(), 50);
        document.addEventListener("keydown", handleKeyDown);
        eventBus.emit("tally:opened", { url });
      });
    };

    const closeModal = () => {
      autoGroup("Close Modal", () => {
        eventBus.emit("tally:close");
        modal.classList.remove("is-active");
        document.body.classList.remove("no-scroll");
        modal.setAttribute("aria-hidden", "true");
        iframe.src = "";
        if (previousActiveElement && (previousActiveElement as HTMLElement).focus)
          (previousActiveElement as HTMLElement).focus();
        if (overallFallbackTimer) clearTimeout(overallFallbackTimer);
        hidePreloaderImmediate();
        document.removeEventListener("keydown", handleKeyDown);
        eventBus.emit("tally:closed");
        releaseAccent();
      });
    };

    // ---- CTA click handler ----
    const onBodyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLElement>(SELECTORS.trigger);
      if (!link) return;
      e.preventDefault();

      const href = (link as HTMLAnchorElement).getAttribute("href") || "";
      const accentAttr = link.getAttribute("dd-tally-accent");
      const accentHex = normalizeHexColor(accentAttr);

      if (accentHex) lockAccent(accentHex);
      if (href) openModal(href);
    };

    document.body.addEventListener("click", onBodyClick, true);
    closeBtn.addEventListener("click", closeModal);

    // --- Auto-open if URL contains formId and optional accent ---
    const params = new URLSearchParams(window.location.search);
    const formId = params.get("formId");
    const accentParam = params.get("accent");

    if (formId) {
      const tallyUrl = `https://tally.so/embed/${formId}?transparentBackground=1`;
      log("Tally auto-open from URL params", { tallyUrl, accentParam });

      window.addEventListener("DOMContentLoaded", () => {
        // small delay so other scripts can boot, then we forcibly freeze anyway
        setTimeout(() => {
          let accentHex: string | null = null;
          if (accentParam) {
            accentHex = normalizeHexColor(accentParam);
            if (accentHex) lockAccent(accentHex);
          }
          openModal(tallyUrl);
        }, 150);
      });
    }

    handles = { openModal, closeModal };
    eventBus.emit("tally:initialized");
  });

  return handles;
};
