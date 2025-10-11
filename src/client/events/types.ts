// src/client/events/augmentAppEvents.d.ts
import type { AppEvents } from '$digerati/events/types';

declare module '$digerati/events/types' {
  interface AppEvents {
    // --- Auto Hide Accordion Item ---
    'autoHideAccordionItem:missingItems': { selector: string };
    'autoHideAccordionItem:closedSibling': { closed: HTMLElement };
    'autoHideAccordionItem:initialized': { count: number };
    'autoHideAccordionItem:destroyed': void;

    // --- Favicon Hue Rotate ---
    'faviconHueRotateStepped:skipped': { reason?: string };
    'faviconHueRotateStepped:running': void;
    'faviconHueRotateStepped:locked': { hue: number; current: number };
    'faviconHueRotateStepped:released': void;

    // --- Legal Colour Cycle ---
    'legalColourCycle:noneFound': { selector: string };
    'legalColourCycle:applied': { count: number; selector: string };
    'legalColourCycle:appliedObserved': { count: number };
    'legalColourCycle:observerAttached': { root: string };
    'legalColourCycle:initialized': { selector: string; observed: boolean; initialCount: number };
    'legalColourCycle:observerDisconnected': void;
    'legalColourCycle:removedOnDestroy': { count: number };
    'legalColourCycle:destroyed': void;

    // --- Lottie ---
    'lottie:init': { count: number };
    'lottie:created': { element: HTMLElement; path: string };
    'lottie:entered': { element: HTMLElement };
    'lottie:exited': { element: HTMLElement };
    'lottie:paused': { element: HTMLElement };
    'lottie:destroyed': { element: HTMLElement };

    // --- Reason Generator ---
    'reasonGenerator:started': void;
    'reasonGenerator:error': { message: string };
    'reasonGenerator:generated': { reason: string };

    // --- Tally embed modal ---
    'tally:init:error': { reason: string };
    'tally:preloader:show': { mode: string };
    'tally:preloader:hide': { method: 'immediate' | 'fade' | 'fade-fallback' };
    'tally:open': { url: string };
    'tally:load:success': { url: string };
    'tally:load:error': { url: string };
    'tally:load:timeout': { url: string };
    'tally:opened': { url: string };
    'tally:close': void;
    'tally:closed': void;
    'tally:initialized': void;
    'tally:accent:lock': { hex: string };
    'tally:accent:release': void;

    // --- Testimonial Avatar ---
    'testimonialAvatar:init': void;
    'testimonialAvatar:enter': { alt: string };
    'testimonialAvatar:exit': { alt: string | undefined };
    'testimonialAvatar:error': { message: string; alt?: string };
    'testimonialAvatar:initialized': { count: number };
    'testimonialAvatar:destroyed': { alt: string };

  }
}
