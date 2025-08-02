// src/client/modules/testimonialAvatar.ts

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    autoGroup,
    log,
    warn,
    devError,
    error as logError
} from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";
import { shouldAnimate } from "$digerati/accessibility/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Testimonial Avatar Halftone effect tied to scroll visibility.
 */
export const testimonialAvatar = () => {
    autoGroup("Testimonial Avatar", () => {
        eventBus.emit("testimonialAvatar:init", undefined);

        // Respect reduced motion preference
        if (!shouldAnimate()) {
            log("Reduced motion requested; skipping testimonial avatar halftone effects.");
            eventBus.emit("testimonialAvatar:exit", { alt: undefined });
            return;
        }

        if (typeof ScrollTrigger === "undefined") {
            logError("ScrollTrigger is unavailable; aborting testimonialAvatar setup.");
            eventBus.emit("testimonialAvatar:error", {
                message: "ScrollTrigger missing"
            });
            return;
        }

        const avatars = Array.from(
            document.querySelectorAll<HTMLImageElement>(".testimonial_half-tone")
        );

        if (!avatars.length) {
            warn("No testimonial avatars found.");
            return;
        }

        log(`Found ${avatars.length} testimonial avatar(s).`);

        const initIfNeeded = (img: HTMLImageElement) => {
            if ((img as any)._halftone) return;
            try {
                initHalftone(img);
                eventBus.emit("testimonialAvatar:enter", { alt: img.alt });
            } catch (e) {
                logError("Failed to initialize halftone for image:", img.alt || "(no alt)", e);
                eventBus.emit("testimonialAvatar:error", {
                    message: "halftone-init-failure",
                    alt: img.alt
                });
            }
        };

        const destroyIfExists = (img: HTMLImageElement) => {
            if ((img as any)._halftone) {
                destroyHalftone(img);
                eventBus.emit("testimonialAvatar:exit", { alt: img.alt });
            }
        };

        avatars.forEach((img) => {
            ScrollTrigger.create({
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                onToggle: (self) => {
                    if (self.isActive) {
                        initIfNeeded(img);
                    } else {
                        destroyIfExists(img);
                    }
                }
            });
        });

        // Force a layout evaluation in case needed
        ScrollTrigger.refresh();

        eventBus.emit("testimonialAvatar:initialized", { count: avatars.length });
    });
};

/**
 * Initialize the halftone on the image.
 */
const initHalftone = (img: HTMLImageElement) => {
    log("Initializing halftone for", img.alt || "(no alt)");

    const HalftoneConstructor =
        (window as any).BreathingHalftone ?? (globalThis as any).BreathingHalftone;

    if (typeof HalftoneConstructor === "undefined") {
        devError("BreathingHalftone constructor is not available.");
        eventBus.emit("testimonialAvatar:error", {
            message: "BreathingHalftone missing",
            alt: img.alt
        });
        return;
    }

    const instance = new HalftoneConstructor(img, {
        dotSize: 1 / 70,
        dotSizeThreshold: 0.025,
        initVelocity: 0.5,
        oscPeriod: 3,
        oscAmplitude: 0.2,
        isAdditive: false,
        isRadial: false,
        channels: ["lum"],
        isChannelLens: true,
        friction: 0.06,
        hoverDiameter: 0.3,
        hoverForce: -0.02,
        activeDiameter: 0.6,
        activeForce: 0.01
    });

    (img as any)._halftone = instance;
};

/**
 * Destroy the halftone instance if present.
 */
const destroyHalftone = (img: HTMLImageElement) => {
    if ((img as any)._halftone) {
        log("Destroying halftone for", img.alt || "(no alt)");
        try {
            (img as any)._halftone.destroy();
        } catch (e) {
            warn("Error while destroying halftone instance:", e);
        }
        delete (img as any)._halftone;
        eventBus.emit("testimonialAvatar:destroyed", { alt: img.alt });
    }
};
