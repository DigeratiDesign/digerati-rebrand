/**
 * Favicon Hue Rotate
 * Continuously cycles the favicon hue and --h.
 *
 * On iOS / PWA: hue cycling still drives --h,
 * but favicon drawing is skipped to avoid wasted work.
 *
 * @author <cabal@digerati.design>
 */

import { autoGroup, log, devError } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

const DURATION = 12000;
const SIZE32 = 32;
const SIZE16 = 16;
const MAX_FPS = 60;

export const faviconHueRotateStepped = (): void => {
  autoGroup("Favicon Hue Rotate", () => {
    const env = getFaviconEnv();

    const baseHref = env.shouldDrawFavicon ? findBaseHref() : null;
    if (env.shouldDrawFavicon && !baseHref)
      return devError("No base favicon found.");

    // canvases only used when favicon drawing enabled
    const c32 = env.shouldDrawFavicon ? document.createElement("canvas") : null;
    const c16 = env.shouldDrawFavicon ? document.createElement("canvas") : null;
    const ctx32 = c32 ? c32.getContext("2d")! : null;
    const ctx16 = c16 ? c16.getContext("2d")! : null;

    if (env.shouldDrawFavicon) {
      c32!.width = SIZE32;
      c32!.height = SIZE32;
      c16!.width = SIZE16;
      c16!.height = SIZE16;
      Array.from(document.querySelectorAll("link[rel*='icon']")).forEach((n) =>
        n.remove()
      );
    }

    const link32 = env.shouldDrawFavicon
      ? makeLink("live-favicon-32", `${SIZE32}x${SIZE32}`)
      : null;
    const link16 = env.shouldDrawFavicon
      ? makeLink("live-favicon-16", `${SIZE16}x${SIZE16}`)
      : null;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      log(
        env.shouldDrawFavicon
          ? "Favicon hue rotation active"
          : "Hue rotation active (favicon skipped)"
      );

      let rafId: number | null = null;
      let lastCssWriteAt = 0;
      let paused = false;
      const origin = performance.now();
      const cssMinDelta = 1000 / MAX_FPS;

      const draw = (hue: number) => {
        if (!env.shouldDrawFavicon) return; // skip on iOS etc.
        (ctx32 as any).filter = `hue-rotate(${hue}deg)`;
        ctx32!.clearRect(0, 0, SIZE32, SIZE32);
        ctx32!.drawImage(img, 0, 0, SIZE32, SIZE32);
        (ctx32 as any).filter = "none";
        link32!.href = c32!.toDataURL("image/png");

        (ctx16 as any).filter = `hue-rotate(${hue}deg)`;
        ctx16!.clearRect(0, 0, SIZE16, SIZE16);
        ctx16!.drawImage(img, 0, 0, SIZE16, SIZE16);
        (ctx16 as any).filter = "none";
        link16!.href = c16!.toDataURL("image/png");
      };

      const tick = (now: number) => {
        const elapsed = now - origin;
        const phase = ((elapsed % DURATION) + DURATION) % DURATION / DURATION;
        const currentHue = (phase * 360) % 360;

        if (!paused && now - lastCssWriteAt >= cssMinDelta) {
          document.documentElement.style.setProperty("--h", `${currentHue}deg`);
          draw(currentHue);
          lastCssWriteAt = now;
        }
        if (!paused) rafId = requestAnimationFrame(tick);
      };

      const start = () => {
        if (rafId) cancelAnimationFrame(rafId);
        paused = false;
        lastCssWriteAt = 0;
        rafId = requestAnimationFrame(tick);
      };

      const stop = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      };

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") stop();
        else if (!paused) start();
      });

      addEventListener(
        "pagehide",
        () => {
          stop();
        },
        { once: true }
      );

      start();
      eventBus.emit("faviconHueRotateStepped:running");
    };

    if (env.shouldDrawFavicon && baseHref) img.src = baseHref;
    else img.onload?.(); // simulate load when skipping favicon
  });
};

// ----------------- helpers -----------------

const getFaviconEnv = (): { shouldDrawFavicon: boolean } => {
  const ua = navigator.userAgent;
  const isIOS = /iP(hone|ad|od)/.test(ua);
  const isCriOS = /CriOS/i.test(ua);
  const isFxiOS = /FxiOS/i.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isIOSSafari = isIOS && isSafari && !isCriOS && !isFxiOS;
  const isStandalone =
    matchMedia?.("(display-mode: standalone)")?.matches ||
    (navigator as any).standalone === true;

  const shouldDrawFavicon = !(isIOSSafari || isStandalone);
  return { shouldDrawFavicon };
};

const findBaseHref = (): string | null => {
  const links = Array.from(
    document.querySelectorAll("link[rel*='icon']")
  ) as HTMLLinkElement[];
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
