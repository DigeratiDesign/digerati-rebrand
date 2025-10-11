/**
 * Favicon Hue Rotate (Stepped)
 * Cycles the site favicon through discrete hue-rotated frames while syncing
 * a continuous CSS --h variable for page hue animations.
 *
 * Adds smooth "freeze when reached" behaviour for tally:accent:lock / release,
 * and emits events when the lock colour has been reached / released.
 *
 * @author <cabal@digerati.design>
 */

import { autoGroup, log, devError } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

const DURATION = 12000; // ms for full cycle
const STEP_INTERVAL_MS = 500;
const STEPS = Math.max(8, Math.round(DURATION / STEP_INTERVAL_MS));
const SIZE32 = 32;
const SIZE16 = 16;
const MAX_FPS = 60;
const HUE_TOLERANCE = 1.5; // degrees — how close before freezing

export const faviconHueRotateStepped = (): void => {
  autoGroup("Favicon Hue Rotate (Stepped)", () => {
    const gate = shouldAnimateFavicon();
    if (!gate.ok) {
      log(`Favicon hue rotation skipped: ${gate.reason ?? "unknown"}`);
      eventBus.emit("faviconHueRotateStepped:skipped", { reason: gate.reason });
      return;
    }

    const baseHref = findBaseHref();
    if (!baseHref) {
      devError("No base favicon found.");
      return;
    }

    // Canvas setup
    const c32 = document.createElement("canvas");
    const ctx32 = c32.getContext("2d");
    if (!ctx32 || typeof c32.toDataURL !== "function") return;
    try { (ctx32 as any).filter = "hue-rotate(0deg)"; } catch { }
    if (!("filter" in (ctx32 as any))) return;

    const c16 = document.createElement("canvas");
    const ctx16 = c16.getContext("2d")!;
    c32.width = SIZE32;
    c32.height = SIZE32;
    c16.width = SIZE16;
    c16.height = SIZE16;

    Array.from(document.querySelectorAll("link[rel*='icon']")).forEach((n) => n.remove());
    let link32 = makeLink("live-favicon-32", `${SIZE32}x${SIZE32}`);
    let link16 = makeLink("live-favicon-16", `${SIZE16}x${SIZE16}`);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const frames32: string[] = [];
      const frames16: string[] = [];

      for (let i = 0; i < STEPS; i++) {
        const angle = Math.round(i * (360 / STEPS));
        ctx32.clearRect(0, 0, SIZE32, SIZE32);
        (ctx32 as any).filter = `hue-rotate(${angle}deg)`;
        ctx32.drawImage(img, 0, 0, SIZE32, SIZE32);
        (ctx32 as any).filter = "none";
        frames32[i] = c32.toDataURL("image/png");

        ctx16.clearRect(0, 0, SIZE16, SIZE16);
        (ctx16 as any).filter = `hue-rotate(${angle}deg)`;
        ctx16.drawImage(img, 0, 0, SIZE16, SIZE16);
        (ctx16 as any).filter = "none";
        frames16[i] = c16.toDataURL("image/png");
      }

      log(`Precomputed ${STEPS} favicon frames`);

      const swapFavicons = (data32: string, data16: string) => {
        const n32 = makeLink("live-favicon-32", `${SIZE32}x${SIZE32}`);
        n32.href = data32;
        link32.remove();
        link32 = n32;

        const n16 = makeLink("live-favicon-16", `${SIZE16}x${SIZE16}`);
        n16.href = data16;
        link16.remove();
        link16 = n16;
      };

      let rafId: number | null = null;
      let lastCssWriteAt = 0;
      let lastStep = -1;
      let freezeTarget: number | null = null; // target hue to stop at
      let paused = false;
      let origin = performance.now();

      const cssMinDelta = 1000 / MAX_FPS;

      const tick = (now: number) => {
        const elapsed = now - origin;
        const phase = ((elapsed % DURATION) + DURATION) % DURATION / DURATION;
        const currentHue = (phase * 360) % 360;

        // Update CSS hue
        if (!paused && now - lastCssWriteAt >= cssMinDelta) {
          document.documentElement.style.setProperty("--h", `${currentHue}deg`);
          lastCssWriteAt = now;
        }

        // Favicon update
        const stepIndex = Math.floor(phase * STEPS) % STEPS;
        if (stepIndex !== lastStep) {
          swapFavicons(frames32[stepIndex], frames16[stepIndex]);
          lastStep = stepIndex;
        }

        // Check if we should freeze
        if (freezeTarget != null && !paused) {
          const diff = Math.abs(((currentHue - freezeTarget + 540) % 360) - 180);
          if (diff < HUE_TOLERANCE) {
            log("Hue freeze reached", { target: freezeTarget, current: currentHue });
            paused = true;
            document.documentElement.style.setProperty("--h", `${freezeTarget}deg`);

            // 👇 Add this line
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;

            eventBus.emit("faviconHueRotateStepped:locked", {
              hue: freezeTarget,
              current: currentHue,
            });
            console.log("[Favicon] emitting faviconHueRotateStepped:locked", {
              hue: freezeTarget,
            });
          }
        }

        if (!paused) rafId = requestAnimationFrame(tick);
      };

      const start = () => {
        if (!rafId) {
          paused = false;
          rafId = requestAnimationFrame(tick);
        }
      };

      const stop = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      };

      // --- Lock/Release listeners ---
      const hexToHue = (hex: string): number | null => {
        const n = hex.replace("#", "");
        if (n.length !== 6) return null;
        const r = parseInt(n.slice(0, 2), 16) / 255;
        const g = parseInt(n.slice(2, 4), 16) / 255;
        const b = parseInt(n.slice(4, 6), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        if (d === 0) return 0;
        let h = 0;
        switch (max) {
          case r: h = ((g - b) / d) % 6; break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        return h;
      };

      const onLock = ({ hex }: { hex: string }) => {
        const h = hexToHue(hex);
        if (h != null) {
          const adjustedHue = (h - 120 + 360) % 360; // base lime offset
          log("Locking hue, will freeze when reached", { hex, adjustedHue });
          freezeTarget = adjustedHue;
          paused = false;
        }
      };

      const onRelease = () => {
        log("Hue rotation released");
        eventBus.emit("faviconHueRotateStepped:released");

        if (paused && freezeTarget != null) {
          // calculate new origin so cycle resumes smoothly
          const now = performance.now();
          const progress = freezeTarget / 360;
          origin = now - progress * DURATION;
        }

        freezeTarget = null;
        paused = false;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;

        start();
      };


      const offLock = eventBus.on("tally:accent:lock", onLock);
      const offRelease = eventBus.on("tally:accent:release", onRelease);

      // Visibility behaviour
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") stop();
        else if (!paused) start();
      });

      addEventListener("pagehide", () => {
        stop();
        offLock();
        offRelease();
      }, { once: true });

      start();
      eventBus.emit("faviconHueRotateStepped:running");
    };

    img.onerror = () => devError("Failed to load base favicon.");
    img.src = baseHref;
  });
};

// ----------------- helpers -----------------

const shouldAnimateFavicon = (): { ok: boolean; reason?: string } => {
  if (matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
    return { ok: false, reason: "reduced-motion" };
  if (window.top !== window.self)
    return { ok: false, reason: "in-iframe" };
  const isStandalone =
    matchMedia?.("(display-mode: standalone)")?.matches ||
    (navigator as any).standalone === true;
  if (isStandalone)
    return { ok: false, reason: "standalone" };
  const ua = navigator.userAgent;
  const isIOS = /iP(hone|ad|od)/.test(ua);
  const isCriOS = /CriOS/i.test(ua);
  const isFxiOS = /FxiOS/i.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isIOSSafari = isIOS && isSafari && !isCriOS && !isFxiOS;
  if (isIOSSafari)
    return { ok: false, reason: "ios-safari" };
  return { ok: true };
};

const findBaseHref = (): string | null => {
  const links = Array.from(document.querySelectorAll("link[rel*='icon']")) as HTMLLinkElement[];
  if (!links.length) return null;
  links.sort((a, b) => {
    const ap = (/png/i.test(a.type) || /\.png(\?|$)/i.test(a.href)) ? 1 : 0;
    const bp = (/png/i.test(b.type) || /\.png(\?|$)/i.test(b.href)) ? 1 : 0;
    return bp - ap;
  });
  return links[0].href || null;
};

const makeLink = (id: string, sizes: string): HTMLLinkElement => {
  const l = document.createElement("link");
  l.id = id;
  l.rel = "icon";
  l.type = "image/png";
  l.setAttribute("sizes", sizes);
  document.head.appendChild(l);
  return l;
};
