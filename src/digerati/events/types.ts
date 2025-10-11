// src/digerati/events/types.ts
export interface AppEvents {
  // Accessibility
  'accessibility:reducedMotion:changed': { reduce: boolean };

  // Auto Hide Header
  'autoHideNavbar:initialized': { hiddenClass: string };
  'autoHideNavbar:activated': { reason: 'initial-delay' | 'scroll' | 'timeout' };
  'autoHideNavbar:hide': void;
  'autoHideNavbar:show': void;
  'autoHideNavbar:menuStateChanged': { isOpen: boolean };
  'autoHideNavbar:destroyed': void;

  // Auto Hide Accordion Item
  'autoHideAccordionItem:missingItems': { selector: string };
  'autoHideAccordionItem:closedSibling': { closed: HTMLElement };
  'autoHideAccordionItem:initialized': { count: number };
  'autoHideAccordionItem:destroyed': void;

  // Core lifecycle
  'core:domReady': void;
  'core:webflowReady': void;
  'core:ix2Ready': void;
  'core:fontReady': void;

  // Feature modules
  'accessibility:init': void;
  'accessibility:ready': void;

  'animations:started': { name: string };
  'animations:finished': { name: string };

  'forms:submitted': { formId?: string };
  'cms:itemsLoaded': { count: number };

  // Collection Splitter
  'collectionSplitter:missingTarget': { selector: string };
  'collectionSplitter:empty': { selector: string };
  'collectionSplitter:performed': {
    total: number;
    splitIndex: number;
    firstCount: number;
    secondCount: number;
  };

  // Convert Markdown
  'convertMarkdown:init': { selector: string };
  'convertMarkdown:blockConverted': { blockIndex: number; originalSelector: string };
  'convertMarkdown:enhancedTable': {
    blockIndex: number;
    tableIndex: number;
    headerCount: number;
    wrapped: boolean;
    wrapperClass: string;
  };
  'convertMarkdown:done': { count: number };
  'convertMarkdown:error': { blockIndex: number; error: string };

  // Favicon Hue Rotate
  'faviconHueRotateStepped:skipped': { reason?: string };
  'faviconHueRotateStepped:started': void;
  'faviconHueRotateStepped:running': void;

  // Lottie Viewport Controller
  'lottieViewport:missingElements': { selector: string };
  'lottieViewport:missingPlayer': void;
  'lottieViewport:missingSource': { element: HTMLElement; name: string };
  'lottieViewport:initialized': { count: number; selector: string };
  'lottieViewport:enter': { name: string; element: HTMLElement };
  'lottieViewport:exit': { name: string; element: HTMLElement };
  'lottieViewport:destroyed': { count: number };

  // Legal Colour Cycle
  'legalColourCycle:noneFound': { selector: string };
  'legalColourCycle:applied': { count: number; selector: string };
  'legalColourCycle:appliedObserved': { count: number };
  'legalColourCycle:observerAttached': { root: string };
  'legalColourCycle:initialized': { selector: string; observed: boolean; initialCount: number };
  'legalColourCycle:observerDisconnected': void;
  'legalColourCycle:removedOnDestroy': { count: number };
  'legalColourCycle:destroyed': void;

  // Current Year
  'copyrightYear:applied': { year: string; selector: string };
  'copyrightYear:missing': { selector: string };

  // Page Blur Title
  'pageBlurTitle:initialized': { messagesCount: number };
  'pageBlurTitle:blurred': { title: string };
  'pageBlurTitle:focused': { title: string };
  'pageBlurTitle:destroyed': void;

  // Reason Generator
  'reasonGenerator:started': void;
  'reasonGenerator:error': { message: string };
  'reasonGenerator:generated': { reason: string };

  // Skip to Main Content
  'skipToMainContent:activated': { triggerSelector: string; targetSelector: string };
  'skipToMainContent:missing': { triggerSelector: string; targetSelector: string };

  // Smooth Page Anchor Scroll
  'smoothScroll:click': { href: string; targetId: string | null };
  'smoothScroll:started': {
    targetId: string | null;
    duration: number;
    easing: string;
    offset: number;
  };
  'smoothScroll:finished': { targetId: string | null; interrupted: boolean };
  'smoothScroll:hashTriggered': { hash: string };
  'smoothScroll:skippedReducedMotion': { targetId: string | null };

  // Tally embed modal
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

  // Testimonial Avatar
  'testimonialAvatar:init': void;
  'testimonialAvatar:enter': { alt: string };
  'testimonialAvatar:exit': { alt: string | undefined };
  'testimonialAvatar:error': { message: string; alt?: string };
  'testimonialAvatar:initialized': { count: number };
  'testimonialAvatar:destroyed': { alt: string };

  // Widow Control
  'widow:empty': { selector: string };
  'widow:skipped': { el: HTMLElement; reason: 'skipSelector' | 'tooFewWords' };
  'widow:fixed': { el: HTMLElement; nowrapCount: number };
  'widow:noop': { el: HTMLElement };
}
