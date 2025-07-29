import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const testimonialAvatar = () => {
    console.log("[Halftone] testimonialAvatar() started");

    const avatars = document.querySelectorAll<HTMLImageElement>(".testimonial_half-tone");
    console.log("[Halftone] Found", avatars.length, "avatars");
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

const initHalftone = (img: HTMLImageElement) => {
    console.log("[Halftone] Initializing for", img.alt || "(no alt)");

    const instance = new BreathingHalftone(img, {
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