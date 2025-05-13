/**
 * Tally Modal
 * 
 * @author <cabal@digerati.design>
 */
export const tallyModal = () => {
    const openButtons = document.querySelectorAll('[dd-tally="open"]');
    const modal = document.querySelector('[dd-tally="modal"]');
    const closeBtn = document.querySelector('[dd-tally="close"]');
    const iframe = document.querySelector('[dd-tally="iframe"]');

    if (!openButtons.length || !modal || !closeBtn || !iframe) {
        console.warn('[TallyModal] Missing required elements');
        return;
    }

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let previousActiveElement = null;

    function trapFocus(e) {
        const focusableEls = modal.querySelectorAll(focusableSelectors);
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    }

    function openModal(url) {
        console.log('[TallyModal] Opening modal with URL:', url);
        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
        modal.setAttribute('aria-hidden', 'false');
        iframe.setAttribute('src', url);
        previousActiveElement = document.activeElement;

        setTimeout(() => {
            closeBtn.focus();
        }, 50);

        document.addEventListener('keydown', handleKeyDown);
    }

    function closeModal() {
        console.log('[TallyModal] Closing modal');
        modal.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        modal.setAttribute('aria-hidden', 'true');
        iframe.setAttribute('src', ''); // Clear the iframe on close for better performance

        if (previousActiveElement) {
            previousActiveElement.focus();
        }

        document.removeEventListener('keydown', handleKeyDown);
    }

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
            const url = btn.getAttribute('dd-tally-url');
            if (!url) {
                console.warn('[TallyModal] No dd-tally-url found on clicked button.');
                return;
            }
            openModal(url);
        });
    });

    closeBtn.addEventListener('click', closeModal);
};
