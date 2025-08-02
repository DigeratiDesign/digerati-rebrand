// src/digerati/modules/smoothScroll.ts

/**
 * Smooth scroll to internal anchors with easing and offset support.
 * Respects prefers-reduced-motion and emits lifecycle events.
 * 
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

type EasingName =
    | "linear"
    | "easeInQuad"
    | "easeOutQuad"
    | "easeInOutQuad"
    | "easeInCubic"
    | "easeOutCubic"
    | "easeInOutCubic";

export interface SmoothScrollOptions {
    duration?: number; // milliseconds
    easing?: EasingName;
    anchorSelector?: string; // default 'a[href^="#"]'
    offsetAttribute?: string; // attribute to read offset container, default 'ms-code-scroll-offset'
    disableWebflowAnchorOverride?: boolean; // if true skip the jQuery off hack
}

const EASING_FUNCTIONS: Record<EasingName, (t: number) => number> = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => {
        t -= 1;
        return t * t * t + 1;
    },
    easeInOutCubic: (t) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Teardown = { destroy: () => void };

export const smoothScroll = (options: Partial<SmoothScrollOptions> = {}): Teardown => {
    return autoGroup("SmoothScroll Init", () => {
        const {
            duration = 1000,
            easing = "easeInOutCubic",
            anchorSelector = 'a[href^="#"]',
            offsetAttribute = "ms-code-scroll-offset",
            disableWebflowAnchorOverride = false,
        } = options;

        // guard against double initialization
        const FLAG = "__digerati_smoothScrollInitialized";
        if ((window as any)[FLAG]) {
            log("SmoothScroll: already initialized; skipping re-init.");
            return {
                destroy: () => {
                    /* noop */
                },
            };
        }
        (window as any)[FLAG] = true;

        let currentAnimationFrame: number | null = null;

        const getOffset = (): number => {
            const navbar = document.querySelector<HTMLElement>(`[${offsetAttribute}]`);
            if (!navbar) return 0;
            const navbarHeight = navbar.offsetHeight;
            const customOffset = parseInt(
                navbar.getAttribute(offsetAttribute) || "0",
                10
            );
            return navbarHeight + (isNaN(customOffset) ? 0 : customOffset);
        };

        const scrollToTarget = (target: HTMLElement) => {
            const startPosition = window.pageYOffset;
            const offset = getOffset();
            const targetPosition =
                target.getBoundingClientRect().top + startPosition - offset;
            const distance = targetPosition - startPosition;
            const startTime = performance.now();

            eventBus.emit("smoothScroll:started", {
                targetId: target.id || null,
                duration,
                easing,
                offset,
            });

            const step = (now: number) => {
                const timeElapsed = now - startTime;
                let progress = Math.min(timeElapsed / duration, 1);
                if (prefersReducedMotion()) {
                    // Skip smoothness if user prefers reduced motion
                    log("Reduced motion preference detected; jumping immediately.");
                    eventBus.emit("smoothScroll:skippedReducedMotion", { targetId: target.id || null });
                    window.scrollTo(0, targetPosition);
                    eventBus.emit("smoothScroll:finished", {
                        targetId: target.id || null,
                        interrupted: false,
                    });
                    return;
                }
                const easeProgress = EASING_FUNCTIONS[easing](progress as number);
                window.scrollTo(0, startPosition + distance * easeProgress);
                if (timeElapsed < duration) {
                    currentAnimationFrame = requestAnimationFrame(step);
                } else {
                    currentAnimationFrame = null;
                    eventBus.emit("smoothScroll:finished", {
                        targetId: target.id || null,
                        interrupted: false,
                    });
                }
            };

            // cancel any existing
            if (currentAnimationFrame !== null) {
                cancelAnimationFrame(currentAnimationFrame);
                eventBus.emit("smoothScroll:finished", {
                    targetId: target.id || null,
                    interrupted: true,
                });
            }
            currentAnimationFrame = requestAnimationFrame(step);
        };

        const handleAnchorClick = (e: Event) => {
            const anchor = e.currentTarget as HTMLAnchorElement;
            const href = anchor.getAttribute("href") || "";
            if (!href.startsWith("#")) return;
            const hash = href.slice(1);
            const target = document.getElementById(hash);
            if (!target) return;

            e.preventDefault();
            log("Anchor clicked for smooth scroll:", href);
            eventBus.emit("smoothScroll:click", { href, targetId: target.id || null });

            scrollToTarget(target);
            // optionally update the hash without jumping
            history.replaceState(null, "", `#${hash}`);
        };

        const handleHashChange = () => {
            if (!window.location.hash) return;
            const hash = window.location.hash.slice(1);
            const target = document.getElementById(hash);
            if (!target) return;
            log("Hash change triggered smooth scroll:", window.location.hash);
            eventBus.emit("smoothScroll:hashTriggered", { hash });
            // delay so layout settles
            setTimeout(() => scrollToTarget(target), 0);
        };

        // disable Webflow's default anchor scroll if jQuery is available and not opted out
        if (!disableWebflowAnchorOverride && (window as any).jQuery) {
            (window as any).jQuery(() => {
                (window as any).jQuery(document).off("click.wf-scroll");
                log("Disabled Webflow default anchor scroll handler via jQuery.");
            });
        }

        // attach listeners
        const anchors = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(anchorSelector)
        );
        anchors.forEach((anchor) => {
            anchor.addEventListener("click", handleAnchorClick);
        });
        window.addEventListener("hashchange", handleHashChange);

        // initial hash handling (if present on page load)
        if (window.location.hash) {
            handleHashChange();
        }

        log("SmoothScroll initialized.", {
            anchorCount: anchors.length,
            duration,
            easing,
            selector: anchorSelector,
        });

        // teardown
        const destroy = () => {
            anchors.forEach((anchor) => {
                anchor.removeEventListener("click", handleAnchorClick);
            });
            window.removeEventListener("hashchange", handleHashChange);
            if (currentAnimationFrame !== null) {
                cancelAnimationFrame(currentAnimationFrame);
                currentAnimationFrame = null;
            }
            delete (window as any)[FLAG];
            log("SmoothScroll torn down.");
        };

        return { destroy };
    });
};
