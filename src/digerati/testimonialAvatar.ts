import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const testimonialAvatar = () => {
    console.log("[Halftone] testimonialAvatar() started");

    const avatars = document.querySelectorAll<HTMLImageElement>(".testimonial_half-tone");
    console.log("[Halftone] Found", avatars.length, "avatars");

    const startHalftone = () => {
        console.log("[Halftone] Starting avatar ScrollTrigger setup");
        avatars.forEach((img) => {
            ScrollTrigger.create({
                trigger: img,
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => initHalftone(img),
                onLeave: () => destroyHalftone(img),
                onEnterBack: () => initHalftone(img),
                onLeaveBack: () => destroyHalftone(img),
            });
        });
        ScrollTrigger.refresh();
    };

    const fadePreloader = async () => {
        const preloader = document.querySelector<HTMLElement>('[dd-fx="preloader"]');
        if (!preloader) {
            console.log("[Halftone] No preloader found → continue immediately");
            startHalftone();
            return;
        }

        // 1) Wait for full page load
        if (document.readyState !== "complete") {
            await new Promise<void>((resolve) => {
                window.addEventListener("load", () => {
                    console.log("[Halftone] window.load fired → now fading preloader");
                    resolve();
                }, { once: true });
            });
        } else {
            console.log("[Halftone] document already loaded → now fading preloader");
        }

        // 2) Set up transition
        preloader.style.transition = "opacity 0.5s ease";

        // 3) Force a reflow so the transition is registered
        //    before we change opacity:
        //    reading offsetWidth forces layout
        //    then in next frame we set opacity to 0
        //    so you actually see the fade
        // ---------------------------------------------------
        // Force reflow:
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        preloader.offsetWidth;
        // Apply fade on next frame:
        requestAnimationFrame(() => {
            preloader.style.opacity = "0";
        });

        // 4) Once faded, hide and start halftone
        preloader.addEventListener(
            "transitionend",
            () => {
                preloader.style.display = "none";
                console.log("[Halftone] Preloader hidden → continue");
                startHalftone();
            },
            { once: true }
        );

        // 5) Fallback in case transitionend doesn’t fire
        setTimeout(() => {
            if (preloader.style.display !== "none") {
                preloader.style.display = "none";
                console.log("[Halftone] Preloader fallback hide → continue");
                startHalftone();
            }
        }, 1000);
    };

    fadePreloader();
};

const initHalftone = (img: HTMLImageElement) => {
    console.log("[Halftone] Initializing for", img.alt || "(no alt)");

    const instance = new BreathingHalftone(img, {
        dotSize: 1 / 70,
        dotSizeThreshold: 0.025,
        initVelocity: 0.05,
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
        activeForce: 0.01,
    });

    (img as any)._halftone = instance;
};

const destroyHalftone = (img: HTMLImageElement) => {
    if ((img as any)._halftone) {
        console.log("[Halftone] Destroying for", img.alt || "(no alt)");
        (img as any)._halftone.destroy();
        delete (img as any)._halftone;
    }
};