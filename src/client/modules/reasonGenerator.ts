// src/client/modules/reasonGenerator.ts

/**
 * Reason Generator.
 * Injects a (conspiracy-flavored) reason into an element marked with [dd-reason].
 * The markup can contain fallback copy; this will replace it on first execution.
 * 
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, devError, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface ReasonGeneratorOptions {
    selector?: string;           // element selector, default '[dd-reason]'
    reasons?: string[];          // override default reason pool
    force?: boolean;             // ignore previous generation and re-generate
}

const DEFAULT_SELECTOR = "[dd-reason]";
const DEFAULT_REASONS = [
    "This page is entangled in a quantum conspiracy, making it simultaneously found and not found until observed by a secret society physicist.",
    "This page has been redirected to a server in the Hollow Earth at the request of our reptilian overlords.",
    "As 404 is an esoteric Illuminati symbol, access to this page has been intentionally obscured to test your initiation level.",
    "Attempting to access this page triggers a mind control buffer overflow, so we've temporarily disabled access for your safety.",
    "Access to this page requires acceptance of secret society cookies, but as they've expired, you'll need to attend a covert baking class to renew them."
];

/**
 * Picks one random item from an array.
 */
const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Initializes the reason text.
 * @returns the reason string that was inserted, or null if nothing was done
 */
export const reasonGenerator = (options: ReasonGeneratorOptions = {}): string | null => {
    return autoGroup("Reason Generator", () => {
        const selector = options.selector ?? DEFAULT_SELECTOR;
        const element = document.querySelector<HTMLElement>(selector);
        eventBus.emit("reasonGenerator:started", undefined);

        if (!element) {
            devError(`Reason element not found using selector "${selector}"`);
            eventBus.emit("reasonGenerator:error", { message: "element-not-found" });
            return null;
        }

        const alreadyGenerated = element.dataset.dgrReasonGenerated === "1";
        if (alreadyGenerated && !options.force) {
            log("Reason already generated; skipping (use { force: true } to override)");
            return element.textContent?.trim() || null;
        }

        const pool = options.reasons && options.reasons.length ? options.reasons : DEFAULT_REASONS;
        if (!pool.length) {
            warn("No reasons available to choose from");
            eventBus.emit("reasonGenerator:error", { message: "empty-reason-pool" });
            return null;
        }

        const reason = pickRandom(pool);
        element.textContent = reason;
        element.dataset.dgrReasonGenerated = "1";
        log("Injected reason:", reason);
        eventBus.emit("reasonGenerator:generated", { reason });
        return reason;
    });
};
