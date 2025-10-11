// src/digerati/accessibility/reducedMotion.ts

import { eventBus } from '$digerati/events';
import { log, warn } from '$digerati/utils/logger';

/**
 * Tracks current reduced-motion state.
 */
let reduceMotionActive = false;

/**
 * Helper to safely get the Webflow IX2 instance if available.
 */
const getIx2 = () => {
  try {
    // Webflow.push ensures Webflow.require exists, but defensive here
    return (window as any).Webflow?.require ? (window as any).Webflow.require('ix2') : null;
  } catch {
    return null;
  }
};

/**
 * Applies or removes reduced-motion effects:
 * - Toggles class for CSS fallback (`html.reduce-motion`)
 * - Destroys IX2 when reduced motion is active; tries to re-init when it's disabled.
 * - Clears GSAP global timeline when reduced motion is active.
 */
const applySetting = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduce = prefersReducedMotion.matches;
  const html = document.documentElement;

  reduceMotionActive = reduce;
  html.classList.toggle('reduce-motion', reduce);

  if (reduce) {
    log('Reduced motion is active; disabling IX2 and clearing GSAP timelines.');
    // Disable Webflow IX2
    const ix2 = getIx2();
    if (ix2 && typeof ix2.destroy === 'function') {
      try {
        ix2.destroy();
      } catch (e) {
        warn('Failed to destroy IX2 gracefully:', e);
      }
    } else {
      warn('IX2 instance not found or destroy method unavailable.');
    }

    // Clear GSAP global timeline if present
    if ((window as any).gsap && (window as any).gsap.globalTimeline) {
      try {
        (window as any).gsap.globalTimeline.clear();
      } catch (e) {
        warn('Failed to clear GSAP global timeline:', e);
      }
    }
  } else {
    log('Reduced motion is not active; attempting to re-initialize IX2 if needed.');
    const ix2 = getIx2();
    if (ix2 && typeof ix2.init === 'function') {
      try {
        ix2.init(); // re-initialize IX2 if it was destroyed earlier
      } catch (e) {
        warn('Failed to re-init IX2:', e);
      }
    } else {
      // Some versions may not expose init; fallback is to refresh triggers or no-op
      log('IX2 re-initialization method not found; relying on existing state.');
    }
  }

  // Notify others
  eventBus.emit('accessibility:reducedMotion:changed', { reduce });
};

/**
 * Sets up the listener and initial application.
 */
export const handleReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Initial application
  applySetting();

  // Listen for changes (modern browsers) with fallback
  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', () => {
      applySetting();
    });
  } else if (typeof (prefersReducedMotion as any).addListener === 'function') {
    // legacy
    (prefersReducedMotion as any).addListener(() => {
      applySetting();
    });
  }
};

/**
 * Utility for other modules to query if animations should run.
 */
export const shouldAnimate = (): boolean => !reduceMotionActive;
