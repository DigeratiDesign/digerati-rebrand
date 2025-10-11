// src/fnord/events/augmentAppEvents.d.ts
import type { AppEvents } from '$digerati/events/types';

declare module '$digerati/events/types' {
  interface AppEvents {
    'fnord:openstreetmap:init': { selector: string };
    'fnord:openstreetmap:ready': void;
    'fnord:openstreetmap:error': { reason: string };
    // Add other fnord-specific events here as you build new shared scripts
  }
}
