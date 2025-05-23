/**
 * Testimonial Avatar.
 * 
 * @author <cabal@digerati.design>
 */
export const testimonialAvatar = () => {
    const avatars = document.querySelectorAll('.testimonial_half-tone');
    if (!avatars.length) {
        console.log('No avatars found.');
        return;
    }
    avatars.forEach(img => {
        new BreathingHalftone(img, {
            dotSize: 1 / 120,
            dotSizeThreshold: 0.025,
            initVelocity: 0.02,
            oscPeriod: 3,
            oscAmplitude: 0.2,
            isAdditive: false,
            isRadial: false,
            channels: [
                'red',
                'green',
                'blue'
            ],
            isChannelLens: true,
            friction: 0.06,
            hoverDiameter: 0.3,
            hoverForce: -0.02,
            activeDiameter: 0.6,
            activeForce: 0.01
        });
    });
};