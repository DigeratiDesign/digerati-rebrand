// src/digerati/events/index.ts

import { EventBus } from "$digerati/utils/eventBus";
import { autoGroup, log } from "$digerati/utils/logger";
import type { AppEvents } from "./types";

declare global {
  interface Window {
    __D_EVENT_BUS?: EventBus<AppEvents>;
  }
}

// ✅ Use or create a single global instance
export const eventBus: EventBus<AppEvents> =
  (window.__D_EVENT_BUS = window.__D_EVENT_BUS || new EventBus<AppEvents>());

/**
 * Optional helper to wire up core and common events into grouped debug logs.
 * Call this once early (e.g., in your main `index.ts` or global init).
 */
export const initEventDebugLogging = () => {
  autoGroup('EventBus Debug', () => {
    eventBus.on('core:domReady', () => log('core:domReady fired'));
    eventBus.on('core:webflowReady', () => log('core:webflowReady fired'));
    eventBus.on('core:fontReady', () => log('core:fontReady fired'));
    eventBus.on('core:ix2Ready', () => log('core:ix2Ready fired'));

    eventBus.on('accessibility:init', () => log('accessibility:init'));
    eventBus.on('accessibility:ready', () => log('accessibility:ready'));

    eventBus.on('animations:started', ({ name }) => log('animation started:', name));
    eventBus.on('animations:finished', ({ name }) => log('animation finished:', name));

    eventBus.on('lottieViewport:initialized', ({ count, selector }) =>
      log(`lottie viewport: ${count} animations for selector ${selector}`)
    );
    eventBus.on('lottieViewport:enter', ({ name }) => log('lottie viewport enter:', name));
    eventBus.on('lottieViewport:exit', ({ name }) => log('lottie viewport exit:', name));

    eventBus.on('forms:submitted', ({ formId }) => log('form submitted:', formId));
    eventBus.on('cms:itemsLoaded', ({ count }) => log('cms items loaded:', count));
  });
};
