/**
 * Favicon Hue Rotate (Stepped)
 * Cycles the site favicon through discrete hue-rotated frames while syncing
 * a continuous CSS --h variable for page hue animations.
 *
 * @author <cabal@digerati.design>
 */

import { autoGroup, log, devError } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

const DURATION = 12000;  // ms for full cycle
const SIZE32 = 32;
const SIZE16 = 16;
const STEPS = 30;        // number of discrete favicon colors
const MAX_FPS = 60;      // CSS update cadence (page smoothness)

/**
 * Main favicon hue rotator.
 */
export const faviconHueRotateStepped = (): void => {
    autoGroup("Favicon Hue Rotate (Stepped)", () => {
        eventBus.emit("faviconHueRotateStepped:started");

        const baseHref = findBaseHref();
        if (!baseHref) {
            devError("No base favicon found.");
            return;
        }

        // Canvas setup
        const c32 = document.createElement("canvas");
        const ctx32 = c32.getContext("2d");
        if (!ctx32 || typeof c32.toDataURL !== "function") return;
        try { ctx32.filter = "hue-rotate(0deg)"; } catch { }
        if (!("filter" in ctx32)) return;

        const c16 = document.createElement("canvas");
        const ctx16 = c16.getContext("2d")!;
        c32.width = SIZE32; c32.height = SIZE32;
        c16.width = SIZE16; c16.height = SIZE16;

        // Remove existing favicons
        Array.from(document.querySelectorAll("link[rel*='icon']")).forEach(n => n.remove());
        let link32 = makeLink("live-favicon-32", `${SIZE32}x${SIZE32}`);
        let link16 = makeLink("live-favicon-16", `${SIZE16}x${SIZE16}`);

        // Load base image and precompute hue-rotated frames
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const frames32: string[] = [];
            const frames16: string[] = [];

            for (let i = 0; i < STEPS; i++) {
                const angle = Math.round(i * (360 / STEPS));

                // 32×32 frame
                ctx32.clearRect(0, 0, SIZE32, SIZE32);
                ctx32.imageSmoothingEnabled = false;
                ctx32.filter = `hue-rotate(${angle}deg)`;
                ctx32.drawImage(img, 0, 0, SIZE32, SIZE32);
                ctx32.filter = "none";
                frames32[i] = c32.toDataURL("image/png");

                // 16×16 frame
                ctx16.clearRect(0, 0, SIZE16, SIZE16);
                ctx16.imageSmoothingEnabled = false;
                ctx16.filter = `hue-rotate(${angle}deg)`;
                ctx16.drawImage(img, 0, 0, SIZE16, SIZE16);
                ctx16.filter = "none";
                frames16[i] = c16.toDataURL("image/png");
            }

            log(`Precomputed ${STEPS} favicon frames`);

            // Swap helper (forces repaint)
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

            const tick = (now: number) => {
                const cssMinDelta = 1000 / MAX_FPS;

                // Continuous CSS hue
                if (now - lastCssWriteAt >= cssMinDelta) {
                    const phase = (now % DURATION) / DURATION;
                    const angle = Math.round(phase * 360);
                    document.documentElement.style.setProperty("--h", `${angle}deg`);
                    lastCssWriteAt = now;
                }

                // Stepped favicon hue
                const phaseForStep = (now % DURATION) / DURATION;
                const stepIndex = Math.floor(phaseForStep * STEPS) % STEPS;
                if (stepIndex !== lastStep) {
                    swapFavicons(frames32[stepIndex], frames16[stepIndex]);
                    lastStep = stepIndex;
                }

                rafId = requestAnimationFrame(tick);
            };

            rafId = requestAnimationFrame(tick);
            addEventListener("pagehide", () => { if (rafId) cancelAnimationFrame(rafId); }, { once: true });

            eventBus.emit("faviconHueRotateStepped:running");
        };

        img.onerror = () => devError("Failed to load base favicon.");
        img.src = baseHref;
    });
};

// ----------------- helpers -----------------

const findBaseHref = (): string | null => {
    const links = Array.from(document.querySelectorAll("link[rel*='icon']")) as HTMLLinkElement[];
    if (!links.length) return null;
    links.sort((a, b) => {
        const ap = (/png/i.test(a.type) || /\.png(\?|$)/i.test(a.href)) ? 1 : 0;
        const bp = (/png/i.test(b.type) || /\.png(\?|$)/i.test(b.href)) ? 1 : 0;
        return bp - ap; // PNG first
    });
    return links[0].href || null;
};

const makeLink = (id: string, sizes: string): HTMLLinkElement => {
    const l = document.createElement("link");
    l.id = id;
    l.rel = "icon";
    l.type = "image/png";
    l.sizes = sizes;
    document.head.appendChild(l);
    return l;
};
