// src/client/events/augmentAppEvents.d.ts
import type { AppEvents } from "$digerati/events/types";

declare module "$digerati/events/types" {
    interface AppEvents {
        // Auto Hide Accordion Item
        "autoHideAccordionItem:missingItems": { selector: string; };
        "autoHideAccordionItem:initialized": { count: number; };
        "autoHideAccordionItem:closedSibling": { closed: HTMLElement; };
        "autoHideAccordionItem:destroyed": {};
        // Colour Cycle
        "ui:activated": { selector: string; count: number; activeClass: string };
        // Mouse Trail
        "mouseTrail:started": { intendedCount: number };
        "mouseTrail:finished": { created: number };
        "mouseTrail:failed": { reason: string };
        // Reason Generator
        "reasonGenerator:started": void;
        "reasonGenerator:generated": { reason: string };
        "reasonGenerator:error": { message: string };
        // Tally
        "tally:init:error": { reason: string };
        "tally:preloader:show": { mode: string };
        "tally:preloader:hide": { method: string };
        "tally:open": { url: string };
        "tally:opened": { url: string };
        "tally:load:success": { url: string };
        "tally:load:error": { url: string };
        "tally:load:timeout": { url: string };
        "tally:close": void;
        "tally:closed": void;
        "tally:initialized": void;
        // Testimonial Avatar
        "testimonialAvatar:init": void;
        "testimonialAvatar:initialized": { count: number };
        "testimonialAvatar:enter": { alt?: string };
        "testimonialAvatar:exit": { alt?: string };
        "testimonialAvatar:destroyed": { alt?: string };
        "testimonialAvatar:error": { message: string; alt?: string };
        // Text Effects
        "linkHoverState:init": void;
        "linkHoverState:ready": { count: number };
        "highlightText:init": void;
        "highlightText:targetInit": { tag: string };
        "highlightText:initialized": { count: number };
        "highlightText:error": { message: string; detail?: string };
        "unmaskText:init": void;
        "unmaskText:progress": { tag: string; progress: number };
        "unmaskText:targetInit": { tag: string };
        "unmaskText:initialized": { count: number };
        "unmaskText:error": { message: string; detail?: string };
    }
}
