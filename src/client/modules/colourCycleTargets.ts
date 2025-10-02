// src/digerati/modules/colourCycleTargets.ts

/**
 * Colour Cycle Targets.
 *
 * Adds `.colour-cycle` class to specific legal text elements
 * (h2/h3 <strong> tags and <a> tags) inside `.text-rich-text.is-legal`.
 *
 * Matches the expanded boilerplate style of other Digerati modules
 * for consistency (constructor options, explicit properties, logging).
 *
 * @author <cabal@digerati.design>
 */
import { autoGroup, log } from "$digerati/utils/logger";

export interface ColourCycleTargetsOptions {
    /** CSS selectors to apply .colour-cycle to */
    selectors?: string[];
}

export class ColourCycleTargets {
    private selectors: string[];
    private boundInit: EventListener;

    constructor(options: ColourCycleTargetsOptions = {}) {
        // default selectors
        this.selectors = options.selectors ?? [
            ".text-rich-text.is-legal h2 strong",
            ".text-rich-text.is-legal h3 strong",
            ".text-rich-text.is-legal a",
        ];

        this.boundInit = this.init.bind(this);
    }

    /**
     * Initialise the module — apply .colour-cycle classes.
     */
    public init(): void {
        const group = autoGroup("ColourCycleTargets");

        this.selectors.forEach((selector) => {
            const elements = document.querySelectorAll<HTMLElement>(selector);

            elements.forEach((el) => {
                if (!el.classList.contains("colour-cycle")) {
                    el.classList.add("colour-cycle");
                    log("Added .colour-cycle to", el, group);
                }
            });
        });
    }
}

/**
 * Public init function to match client modules export pattern.
 */
export function initLegalColourCycle(options?: ColourCycleTargetsOptions): void {
    new ColourCycleTargets(options).init();
}
