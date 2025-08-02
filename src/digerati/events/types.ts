// src/digerati/events/types.ts
export interface AppEvents {

    // Accessibility
    "accessibility:reducedMotion:changed": { reduce: boolean };

    // Auto Hide Header
    "autoHideNavbar:initialized": { hiddenClass: string };
    "autoHideNavbar:activated": { reason: "initial-delay" | "scroll" | "timeout" };
    "autoHideNavbar:hide": {};
    "autoHideNavbar:show": {};
    "autoHideNavbar:menuStateChanged": { isOpen: boolean };
    "autoHideNavbar:destroyed": {};

    // Core lifecycle
    "core:domReady": void;
    "core:webflowReady": void;
    "core:ix2Ready": void;
    "core:fontReady": void;

    // Feature modules
    "accessibility:init": void;
    "accessibility:ready": void;

    "animations:started": { name: string };
    "animations:finished": { name: string };

    "forms:submitted": { formId?: string };
    "cms:itemsLoaded": { count: number };

    // Collection Splitter
    "collectionSplitter:missingTarget": { selector: string };
    "collectionSplitter:empty": { selector: string };
    "collectionSplitter:performed": {
        total: number;
        perSplit: number;
        firstCount: number;
        secondCount: number;
    };

    // Convert Markdown
    "convertMarkdown:init": { selector: string };
    "convertMarkdown:blockConverted": { blockIndex: number; originalSelector: string };
    "convertMarkdown:enhancedTable": { blockIndex: number; headerCount: number };
    "convertMarkdown:done": { count: number };
    "convertMarkdown:error": { blockIndex: number; error: string };

    // Current Year
    "copyrightYear:applied": { year: string; selector: string };
    "copyrightYear:missing": { selector: string };

    // Page Blur Title Cycler
    "pageBlurTitleCycler:initialized": { messagesCount: number };
    "pageBlurTitleCycler:started": { interval: number };
    "pageBlurTitleCycler:stopped": { title: string };
    "pageBlurTitleCycler:destroyed": {};
    "pageBlurTitleCycler:blurIgnoredIframe": { iframe: string };

    // Skip to Main Content
    "skipToMainContent:activated": { triggerSelector: string; targetSelector: string };
    "skipToMainContent:missing": { triggerSelector: string; targetSelector: string };

    // Smooth Page Anchor Scroll
    "smoothScroll:click": { href: string; targetId: string | null };
    "smoothScroll:started": {
        targetId: string | null;
        duration: number;
        easing: string;
        offset: number;
    };
    "smoothScroll:finished": { targetId: string | null; interrupted: boolean };
    "smoothScroll:hashTriggered": { hash: string };
    "smoothScroll:skippedReducedMotion": { targetId: string | null };
}
