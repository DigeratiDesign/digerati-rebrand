// src/digerati/modules/currentYear.ts

/**
 * Current Year injector.
 * Finds an element (by default `[dd-date="current-year"]`) and sets its text to the current year.
 * Returns the year string so callers can also consume it programmatically.
 * 
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface CurrentYearOptions {
    selector?: string; // CSS selector to target, default is '[dd-date="current-year"]'
}

export class CurrentYear {
    private selector: string;

    constructor(options: CurrentYearOptions = {}) {
        this.selector = options.selector ?? '[dd-date="current-year"]';
    }

    /** Returns the current year as string (e.g. "2025") */
    get(): string {
        return new Date().getFullYear().toString();
    }

    /** Injects the current year into the DOM target and returns it. */
    apply(): string {
        return autoGroup("CurrentYear", () => {
            const year = this.get();
            const el = document.querySelector<HTMLElement>(this.selector);
            if (!el) {
                warn(`CurrentYear: element not found for selector "${this.selector}"`);
                eventBus.emit("currentYear:missing", { selector: this.selector });
                return year;
            }
            el.textContent = year;
            log(`CurrentYear: injected "${year}" into "${this.selector}"`);
            eventBus.emit("currentYear:applied", { year, selector: this.selector });
            return year;
        });
    }

    /** Convenience static helper */
    static inject(options?: CurrentYearOptions): string {
        return new CurrentYear(options).apply();
    }
}
