// src/digerati/ready.ts

declare global {
  interface Window {
    Webflow?: Array<() => void> & {
      push: (fn: () => void) => void;
      require?: (module: string) => any;
    };
  }
}

/**
 * Runs callback when DOM is parsed.
 */
export const domReady = (cb: () => void): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb, { once: true });
  } else {
    cb();
  }
};

/**
 * Runs callback when Webflow has initialized its internal queue (safe for IX2 / Webflow components).
 */
export const webflowReady = (cb: () => void): void => {
  if (!window.Webflow) {
    window.Webflow = [] as unknown as NonNullable<typeof window.Webflow>;
  }
  window.Webflow.push(cb);
};

/**
 * Runs callback after Webflow IX2 signals it's ready.
 * Note: IX2 fires "ix2-animation-ready" once its runtime is initialized.
 */
export const ix2Ready = (cb: () => void): void => {
  document.addEventListener(
    'ix2-animation-ready',
    () => {
      cb();
    },
    { once: true }
  );
};

/**
 * Runs callback once fonts are loaded (fallbacks immediately if FontFaceSet API unavailable).
 */
export const fontReady = (cb: () => void): void => {
  if (document.fonts && typeof document.fonts.ready !== 'undefined') {
    document.fonts.ready.then(cb).catch(() => cb());
  } else {
    cb();
  }
};

/**
 * Convenience combined runner. Each phase is optional.
 * Order: DOM -> Webflow -> IX2 (independent) and Font (independent).
 */
export const ready = (
  domCb?: () => void,
  webflowCb?: () => void,
  ix2Cb?: () => void,
  fontCb?: () => void
): void => {
  if (domCb) domReady(domCb);
  if (webflowCb) webflowReady(webflowCb);
  if (ix2Cb) ix2Ready(ix2Cb);
  if (fontCb) fontReady(fontCb);
};

export {}; // ensure module scope
