/**
 * Tally Modal.
 * 
 * @author <cabal@digerati.design>
 */
export const tallyModal = () => {
    /* Tally Modal */
    const openButtons = document.querySelectorAll('[data-open-modal]');
    const modal = document.getElementById('tally-fullscreen');
    const closeBtn = document.getElementById('tally-close');
    const iframe = modal.querySelector('iframe');
    if (!openButtons.length || !modal || !closeBtn || !iframe) {
        return;
    }
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let previousActiveElement = null;
    /* Trap Focus */
    function trapFocus(e) {
        const focusableEls = modal.querySelectorAll(focusableSelectors);
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        }
    }
    /* Open Modal */
    function openModal() {
        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
        modal.setAttribute('aria-hidden', 'false');
        previousActiveElement = document.activeElement;
        setTimeout(() => {
            closeBtn.focus(); // start focus on close
        }, 50);
        document.addEventListener('keydown', handleKeyDown);
    }
    /* Close Modal */
    function closeModal() {
        modal.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        modal.setAttribute('aria-hidden', 'true');
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
        document.removeEventListener('keydown', handleKeyDown);
    }
    /* Handle Key Down */
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
        } else {
            trapFocus(e);
        }
    }
    openButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });
    closeBtn.addEventListener('click', closeModal);
};
