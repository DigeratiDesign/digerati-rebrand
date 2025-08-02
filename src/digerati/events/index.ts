// src/digerati/events/index.ts

import { EventBus } from "$digerati/utils/eventBus";
import type { AppEvents } from "./types";
import { log, autoGroup } from "$digerati/utils/logger";

export const eventBus = new EventBus<AppEvents>();

/**
 * Optional helper to wire up core and common events into grouped debug logs.
 * Call this once early (e.g., in your main `index.ts` or global init).
 */
export const initEventDebugLogging = () => {
    autoGroup("EventBus Debug", () => {
        eventBus.on("core:domReady", () => log("core:domReady fired"));
        eventBus.on("core:webflowReady", () => log("core:webflowReady fired"));
        eventBus.on("core:fontReady", () => log("core:fontReady fired"));
        eventBus.on("core:ix2Ready", () => log("core:ix2Ready fired"));

        eventBus.on("accessibility:init", () => log("accessibility:init"));
        eventBus.on("accessibility:ready", () => log("accessibility:ready"));

        eventBus.on("animations:started", ({ name }) => log("animation started:", name));
        eventBus.on("animations:finished", ({ name }) => log("animation finished:", name));

        eventBus.on("forms:submitted", ({ formId }) => log("form submitted:", formId));
        eventBus.on("cms:itemsLoaded", ({ count }) => log("cms items loaded:", count));
    });
};
