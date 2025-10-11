// src/digerati/utils/register.ts

/**
 * Centralized lifecycle registration utility for Webflow + TypeScript projects.
 * Exports four helpers: domReady, webflowReady, ix2Ready, fontReady.
 * Callbacks are queued and invoked even if registered after the event has already fired.
 */

// Define a simple callback type
type Callback = () => void;

/** ------------------ DOM READY ------------------ */
// Queue of callbacks for DOMContentLoaded
const domReadyCallbacks: Callback[] = [];
// Flag indicating if DOMContentLoaded has already fired
let domReadyFired = document.readyState === 'interactive' || document.readyState === 'complete';

// Internal runner for DOM ready callbacks
function runDomReady() {
  domReadyCallbacks.forEach((fn) => fn());
  domReadyCallbacks.length = 0;
}

// Listen to DOMContentLoaded if it hasn't fired yet
if (!domReadyFired) {
  document.addEventListener('DOMContentLoaded', () => {
    domReadyFired = true;
    runDomReady();
  });
}

/**
 * Register a callback to run on DOMContentLoaded.
 * If the event has already fired, the callback is invoked immediately.
 */
export function domReady(fn: Callback): void {
  if (domReadyFired) fn();
  else domReadyCallbacks.push(fn);
}

/** ------------------ WEBFLOW READY ------------------ */
// Extend Window interface for Webflow integration
declare global {
  interface Window {
    Webflow?: {
      push: (fn: Callback) => void;
      require?: (module: string) => any;
    } & Callback[];
  }
}

/**
 * Register a callback to run when Webflow initializes.
 * Functions are pushed onto window.Webflow, which executes them immediately if Webflow has loaded.
 */
export function webflowReady(fn: Callback): void {
  // Ensure the Webflow queue exists
  if (!window.Webflow) {
    window.Webflow = [] as unknown as NonNullable<typeof window.Webflow>;
  }
  // Push the callback into the Webflow queue
  window.Webflow.push(fn);
}

/** ------------------ IX2 / GSAP READY ------------------ */
// Queue of callbacks for IX2 readiness
const ix2Callbacks: Callback[] = [];
// Flag indicating if IX2 has already loaded
let ix2ReadyFired = false;

// After Webflow is ready, poll for the IX2 module
webflowReady(() => {
  const checkIx2 = () => {
    try {
      const ix2 = window.Webflow && window.Webflow.require && window.Webflow.require('ix2');
      if (ix2) {
        ix2ReadyFired = true;
        ix2Callbacks.forEach((fn) => fn());
        ix2Callbacks.length = 0;
      } else {
        setTimeout(checkIx2, 50);
      }
    } catch {
      setTimeout(checkIx2, 50);
    }
  };
  checkIx2();
});

/**
 * Register a callback to run when Webflow IX2 (interactions) is ready.
 * Polls window.Webflow.require('ix2') and invokes callbacks once available.
 */
export function ix2Ready(fn: Callback): void {
  if (ix2ReadyFired) fn();
  else ix2Callbacks.push(fn);
}

/** ------------------ FONT READY ------------------ */
// Queue of callbacks for document.fonts.ready
const fontCallbacks: Callback[] = [];
// Flag indicating if fonts.ready has resolved
let fontReadyFired = false;

// Listen for the document.fonts.ready promise
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    fontReadyFired = true;
    fontCallbacks.forEach((fn) => fn());
    fontCallbacks.length = 0;
  });
}

/**
 * Register a callback to run when all @font-face fonts have loaded.
 * If fonts.ready has already resolved, the callback is invoked immediately.
 */
export function fontReady(fn: Callback): void {
  if (fontReadyFired) fn();
  else fontCallbacks.push(fn);
}
