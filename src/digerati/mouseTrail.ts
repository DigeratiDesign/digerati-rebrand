/**
 * Mouse Trail.
 * 
 * @author <cabal@digerati.design>
 */
export const mouseTrail = () => {
    const fxContainer = document.querySelector('[data-fx="mouse-trail"]');
    if (fxContainer) {
        for (let i = 0; i < 750; i++) {
            const fx = document.createElement('i');
            fxContainer.appendChild(fx);
        }
    }
    document.querySelectorAll('.colour-cycle, .preloader').forEach(el => {
        el.classList.add('is-active');
    });
};
