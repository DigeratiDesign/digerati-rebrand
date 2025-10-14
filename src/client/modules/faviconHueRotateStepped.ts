/**
 * Favicon Hue Rotate (Instant Lock)
 * Continuously cycles hue while unlocked,
 * instantly switches to target hex on lock.
 *
 * On lock: favicon recoloured + accent var overridden.
 * On release: accent var restored + cycling resumed.
 *
 * On iOS / PWA: hue cycling still drives --h and accent vars,
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
  autoGroup("Favicon Hue Rotate (Instant Lock)", () => {
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
      let origin = performance.now();
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

      const applyExactFaviconColour = (hex: string) => {
        if (!env.shouldDrawFavicon) return; // skip on iOS etc.
        const rT = parseInt(hex.slice(1, 3), 16);
        const gT = parseInt(hex.slice(3, 5), 16);
        const bT = parseInt(hex.slice(5, 7), 16);
        const DARK_THRESHOLD = 140;
        const SOFT_BLEND = 0;

        [[ctx32, SIZE32, link32], [ctx16, SIZE16, link16]].forEach(
          ([ctx, size, link]) => {
            const c = ctx as CanvasRenderingContext2D;
            if (!c) return;
            c.clearRect(0, 0, size as number, size as number);
            c.drawImage(img, 0, 0, size as number, size as number);

            const imageData = c.getImageData(0, 0, size as number, size as number);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              const r = data[i],
                g = data[i + 1],
                b = data[i + 2],
                a = data[i + 3];
              if (a === 0) continue;
              const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
              const t =
                brightness < DARK_THRESHOLD
                  ? SOFT_BLEND * (brightness / DARK_THRESHOLD)
                  : 1;
              data[i] = Math.round(r * (1 - t) + rT * t);
              data[i + 1] = Math.round(g * (1 - t) + gT * t);
              data[i + 2] = Math.round(b * (1 - t) + bT * t);
            }

            c.putImageData(imageData, 0, 0);
            (link as HTMLLinkElement).href =
              (size === SIZE32 ? c32 : c16)!.toDataURL("image/png");
          }
        );
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

      const onLock = ({ hex }: { hex: string }) => {
        paused = true;
        log("Instant hue lock applied", { hex });

        applyExactFaviconColour(hex);
        document.documentElement.style.setProperty("--h", "0deg");
        document.documentElement.style.setProperty("--color-scheme-1--accent", hex);
        eventBus.emit("faviconHueRotateStepped:locked", { hex, instant: true });
      };

      const onRelease = () => {
        log("Hue rotation released (resume cycle)");
        document.documentElement.style.removeProperty("--color-scheme-1--accent");
        paused = false;
        origin = performance.now();
        lastCssWriteAt = 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
        eventBus.emit("faviconHueRotateStepped:released");
      };

      const offLock = eventBus.on("tally:accent:lock", onLock);
      const offRelease = eventBus.on("tally:accent:release", onRelease);

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") stop();
        else if (!paused) start();
      });

      addEventListener(
        "pagehide",
        () => {
          stop();
          offLock();
          offRelease();
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
