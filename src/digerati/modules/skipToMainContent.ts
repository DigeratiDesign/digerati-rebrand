// src/digerati/modules/skipToMainContent.ts

/**
 * Skip to Main Content.
 *
 * Accessible “skip link” behavior: focuses the target element when the trigger
 * is activated via click or keyboard (Enter/Space). Adds minimal DOM tweaks
 * and emits events for observability.
 *
 * @author <cabal@digerati.design>
 */
import { eventBus } from '$digerati/events';
import { autoGroup, log, warn } from '$digerati/utils/logger';

export interface SkipToMainContentOptions {
  triggerSelector?: string;
  targetSelector?: string;
}

export const skipToMainContent = (opts: SkipToMainContentOptions = {}) => {
  autoGroup('Skip To Main Content', () => {
    const triggerSelector = opts.triggerSelector ?? '[dd-skip-to-main-content="trigger"]';
    const targetSelector = opts.targetSelector ?? '[dd-skip-to-main-content="target"]';

    const trigger = document.querySelector<HTMLElement>(triggerSelector);
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!trigger || !target) {
      warn('SkipToMainContent: trigger or target missing', { triggerSelector, targetSelector });
      eventBus.emit('skipToMainContent:missing', { triggerSelector, targetSelector });
      return;
    }

    // If trigger is not inherently interactive, make it keyboard focusable and announce role
    const tag = trigger.tagName.toLowerCase();
    const isNativeFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(tag);
    if (!isNativeFocusable) {
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('role', 'button');
    }

    const activate = (e?: Event) => {
      if (e) e.preventDefault();
      // Temporarily allow focus on target
      const previousTabIndex = target.getAttribute('tabindex');
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });

      // Cleanup after blur
      const onBlur = () => {
        if (previousTabIndex !== null) {
          target.setAttribute('tabindex', previousTabIndex);
        } else {
          target.removeAttribute('tabindex');
        }
        target.removeEventListener('blur', onBlur);
      };
      target.addEventListener('blur', onBlur);

      log('Skip to main content activated', { triggerSelector, targetSelector });
      eventBus.emit('skipToMainContent:activated', { triggerSelector, targetSelector });
    };

    trigger.addEventListener('click', (e) => activate(e));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        activate(e);
      }
    });
  });
};
