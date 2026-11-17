// src/client/utils/pageTransition.ts

/**
 * The page transition is the full-screen dot preloader, `[dd-fx="preloader"]`.
 * Webflow Interactions drive it: "Preloader [Loading]" shows it on page start, and
 * "Preloader [Loaded]" runs on page finish (window `load`), fading it out over
 * 500ms and then setting `display: none`. Its stylesheet default is
 * `display: block`, so a computed `display: none` after `load` means the dots have
 * completely animated out. Webflow emits no event, so this watches for that state.
 */
const PRELOADER = '[dd-fx="preloader"]';

/** Only if Webflow never hides the preloader: its fade takes 500ms after `load`. */
const FALLBACK_AFTER_LOAD_MS = 3000;

/**
 * Resolves once the page has loaded and the transition has fully cleared. It
 * checks the current state first, so it works whether it is called before or
 * after the transition completes.
 */
export function pageTransitionCleared(doc: Document = document): Promise<void> {
  const win = doc.defaultView;
  if (!win) return Promise.resolve();

  return new Promise((resolve) => {
    let observer: MutationObserver | undefined;
    let fallback = 0;

    const cleared = () => {
      const preloader = doc.querySelector<HTMLElement>(PRELOADER);
      return !preloader || win.getComputedStyle(preloader).display === 'none';
    };

    const finish = () => {
      observer?.disconnect();
      win.clearTimeout(fallback);
      resolve();
    };

    const watch = () => {
      if (cleared()) return finish();
      const preloader = doc.querySelector<HTMLElement>(PRELOADER);
      observer = new MutationObserver(() => {
        if (cleared()) finish();
      });
      if (preloader) {
        observer.observe(preloader, { attributes: true, attributeFilter: ['style', 'class'] });
        if (preloader.parentNode) observer.observe(preloader.parentNode, { childList: true });
      }
      fallback = win.setTimeout(finish, FALLBACK_AFTER_LOAD_MS);
    };

    if (doc.readyState === 'complete') watch();
    else win.addEventListener('load', watch, { once: true });
  });
}
