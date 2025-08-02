// src/client/modules/textEffects.ts

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    autoGroup,
    log,
    warn,
    devError
} from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";
import { shouldAnimate } from "$digerati/accessibility/reducedMotion";
import { isDev } from "$digerati/utils/env";

// SplitText may be loaded globally; guard against absence
declare const SplitText: any;

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Link Hover State */
/* ------------------------------------------------------------------ */

/**
 * Wraps link/button inner text so you can animate replacement text on hover.
 */
export const linkHoverState = (): void => {
    autoGroup("Link Hover State", () => {
        eventBus.emit("linkHoverState:init", undefined);

        const selector = ".text-rich-text a, .button, .button-secondary";
        const links: HTMLElement[] = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
        );

        if (!links.length) {
            warn(`No elements found for selector "${selector}"`);
            return;
        }

        let processed = 0;

        links.forEach((link) => {
            // idempotent guard
            if (link.dataset.dgrProcessed === "1") return;

            const buttonLabel = (link.textContent ?? "").trim();
            if (!buttonLabel) return;

            if (
                link.classList.contains("button") ||
                link.classList.contains("button-secondary")
            ) {
                // Button: two nested spans so the data-replace lives on the outer one
                link.innerHTML = `<span data-replace="${buttonLabel}"><span>${buttonLabel}</span></span>`;
            } else {
                // Simple link: one extra span
                link.innerHTML = `<span>${buttonLabel}</span>`;
                link.setAttribute("data-replace", buttonLabel);
            }

            link.dataset.dgrProcessed = "1";
            processed++;
        });

        log(`Processed ${processed} element(s) for hover state.`);

        eventBus.emit("linkHoverState:ready", { count: processed });
    });
};

/* ------------------------------------------------------------------ */
/* Highlight Text */
/* ------------------------------------------------------------------ */

/**
 * Fades characters in/out for `.scroll-highlight` when in view.
 * Requires GSAP + ScrollTrigger + SplitText.
 */
export const highlightText = (): void => {
    autoGroup("Highlight Text", () => {
        eventBus.emit("highlightText:init", undefined);

        if (!shouldAnimate()) {
            log("Skipping highlightText due to reduced motion preference.");
            return;
        }

        if (!gsap) {
            devError("GSAP is missing; cannot run highlightText.");
            return;
        }

        if (typeof SplitText === "undefined") {
            devError("SplitText is not available; cannot run highlightText.");
            return;
        }

        const targets: HTMLElement[] = gsap.utils
            .toArray(".scroll-highlight") as HTMLElement[];

        if (!targets.length) {
            warn("No .scroll-highlight targets found.");
            return;
        }

        targets.forEach((el) => {
            try {
                const split = new SplitText(el, {
                    type: "words,chars",
                    autoSplit: true
                });

                gsap.from(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true,
                        markers: isDev, // show markers only in dev
                    },
                    opacity: 0.2,
                    stagger: 0.1
                });

                eventBus.emit("highlightText:targetInit", { tag: el.tagName });
            } catch (e) {
                devError("Failed to initialize highlightText on element:", el, e);
                eventBus.emit("highlightText:error", {
                    message: "target-init-failure",
                    detail: String(e)
                });
            }
        });

        eventBus.emit("highlightText:initialized", { count: targets.length });
    });
};

/* ------------------------------------------------------------------ */
/* Unmask Text */
/* ------------------------------------------------------------------ */

/**
 * Reveals `.scroll-unmask` elements line-by-line when in view.
 */
export const unmaskText = (): void => {
    autoGroup("Unmask Text", () => {
        eventBus.emit("unmaskText:init", undefined);

        if (!shouldAnimate()) {
            log("Skipping unmaskText due to reduced motion preference.");
            return;
        }

        if (!gsap) {
            devError("GSAP is missing; cannot run unmaskText.");
            return;
        }

        if (typeof SplitText === "undefined") {
            devError("SplitText is not available; cannot run unmaskText.");
            return;
        }

        const elements: HTMLElement[] = gsap.utils
            .toArray(".scroll-unmask") as HTMLElement[];

        if (!elements.length) {
            warn("No .scroll-unmask elements found.");
            return;
        }

        elements.forEach((el) => {
            try {
                const split = new SplitText(el, {
                    type: "lines",
                    linesClass: "line",
                    mask: "lines",
                    autoSplit: true
                });

                gsap.from(split.lines, {
                    yPercent: 100,
                    opacity: 0,
                    stagger: 0.08,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true,
                        markers: isDev,
                        onUpdate: (self: any) => {
                            log(`Unmask progress for ${el.tagName}: ${self.progress.toFixed(2)}`);
                            eventBus.emit("unmaskText:progress", {
                                tag: el.tagName,
                                progress: self.progress
                            });
                        }
                    }
                });

                eventBus.emit("unmaskText:targetInit", { tag: el.tagName });
            } catch (e) {
                devError("Failed to initialize unmaskText on element:", el, e);
                eventBus.emit("unmaskText:error", {
                    message: "target-init-failure",
                    detail: String(e)
                });
            }
        });

        eventBus.emit("unmaskText:initialized", { count: elements.length });
    });
};
