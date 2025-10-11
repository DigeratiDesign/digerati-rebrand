// src/client/events/augmentAppEvents.d.ts
import type { AppEvents } from '$digerati/events/types';

declare module '$digerati/events/types' {
  interface AppEvents {
    // Colour Cycle
    'ui:activated': { selector: string; count: number; activeClass: string };
    // Mouse Trail
    'mouseTrail:started': { intendedCount: number };
    'mouseTrail:finished': { created: number };
    'mouseTrail:failed': { reason: string };
    // Text Effects
    'linkHoverState:init': void;
    'linkHoverState:ready': { count: number };
    'highlightText:init': void;
    'highlightText:targetInit': { tag: string };
    'highlightText:initialized': { count: number };
    'highlightText:error': { message: string; detail?: string };
    'unmaskText:init': void;
    'unmaskText:progress': { tag: string; progress: number };
    'unmaskText:targetInit': { tag: string };
    'unmaskText:initialized': { count: number };
    'unmaskText:error': { message: string; detail?: string };
  }
}
