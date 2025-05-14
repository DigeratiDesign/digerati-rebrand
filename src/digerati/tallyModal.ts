/**
 * Tally Modal
 * 
 * @author <cabal@digerati.design>
 */
export const tallyModal = () => {
    const openLinks = document.querySelectorAll('[dd-tally="open"]');
    const modal = document.querySelector('[dd-tally="modal"]');
    const closeBtn = document.querySelector('[dd-tally="close"]');
    const iframe = document.querySelector('[dd-tally="iframe"]');
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let previousActiveElement = null;

    if (!openLinks.length || !modal || !closeBtn || !iframe) return;

    function trapFocus(e) {
        const focusableEls = modal.querySelectorAll(focusableSelectors);
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    }

    function openModal(url) {
        console.log('[TallyModal] Opening modal with URL:', url);
        iframe.src = url;
        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
        modal.setAttribute('aria-hidden', 'false');
        previousActiveElement = document.activeElement;
        setTimeout(() => closeBtn.focus(), 50);
        document.addEventListener('keydown', handleKeyDown);
    }

    function closeModal() {
        modal.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        modal.setAttribute('aria-hidden', 'true');
        iframe.src = '';
        if (previousActiveElement) previousActiveElement.focus();
        document.removeEventListener('keydown', handleKeyDown);
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
        } else {
            trapFocus(e);
        }
    }

    openLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const url = link.getAttribute('href');
            if (url) openModal(url);
        });
    });

    closeBtn.addEventListener('click', closeModal);
};
