/**
 * Testimonial Avatar.
 * 
 * @author <cabal@digerati.design>
 */
export const testimonialAvatar = () => {
    const avatars = document.querySelectorAll('.testimonial_half-tone');
    if (!avatars.length) {
        console.warn('[Halftone] No .testimonial_half-tone elements found.');
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                const img = entry.target;
                if (!entry.isIntersecting || img.dataset.htDone) return;

                img.dataset.htDone = 'true';
                obs.unobserve(img);

                const initHalftone = () => {
                    console.log(`[Halftone] Initialising halftone for`, img);

                    const instance = new BreathingHalftone(img, {
                        dotSize: 1 / 120,
                        dotSizeThreshold: 0.025,
                        initVelocity: 0.02,
                        oscPeriod: 3,
                        oscAmplitude: 0.2,
                        isAdditive: false,
                        isRadial: false,
                        channels: ['lum'],
                        isChannelLens: true,
                        friction: 0.06,
                        hoverDiameter: 0.3,
                        hoverForce: -0.02,
                        activeDiameter: 0.6,
                        activeForce: 0.01,
                    });

                    // Check if canvas was created
                    if (!instance?.canvas || !(instance.canvas instanceof HTMLCanvasElement)) {
                        console.warn('[Halftone] Canvas was not created for:', img);
                        return;
                    }

                    console.log('[Halftone] Canvas created and inserted:', instance.canvas);

                    // Hide original image completely once canvas is ready
                    requestAnimationFrame(() => {
                        img.style.display = 'none';
                    });
                };

                // Ensure image is fully loaded before initializing
                if (img.complete && img.naturalWidth > 0) {
                    console.log('[Halftone] Image already loaded:', img.src);
                    initHalftone();
                } else {
                    console.log('[Halftone] Waiting for image load:', img.src);
                    img.addEventListener('load', () => {
                        console.log('[Halftone] Image finished loading:', img.src);
                        initHalftone();
                    }, { once: true });
                }
            });
        },
        {
            rootMargin: '0px 0px 300px 0px',
            threshold: 0.5
        }
    );

    avatars.forEach(img => {
        console.log('[Halftone] Observing image:', img.src);
        observer.observe(img);
    });
};
