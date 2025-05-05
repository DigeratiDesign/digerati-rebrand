/**
 * Reason Generator.
 * 
 * @author <cabal@digerati.design>
 */
export const reasonGenerator = () => {
    const reason = document.querySelector('[dd-reason]');
    if (!reason) {
        return;
    }
    const reasons = [
        'This page is entangled in a quantum conspiracy, making it simultaneously found and not found until observed by a secret society physicist.',
        'This page has been redirected to a server in the Hollow Earth at the request of our reptilian overlords.',
        'As 404 is an esoteric Illuminati symbol, access to this page has been intentionally obscured to test your initiation level.',
        'Attempting to access this page triggers a mind control buffer overflow, so we\'ve temporarily disabled access for your safety.',
        'Access to this page requires acceptance of secret society cookies, but as they\'ve expired, you\'ll need to attend a covert baking class to renew them.'
    ];
    reason.innerHTML = reasons[Math.floor(Math.random() * reasons.length)];
};
