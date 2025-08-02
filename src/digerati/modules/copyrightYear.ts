// src/digerati/modules/copyrightYear.ts

/**
 * Copyright Year injector (arrow-function style).
 * Finds an element (by default `[dd-date="copyright-year"]`) and sets its text to the current year.
 * Returns the injected year string.
 *
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, warn } from '$digerati/utils/logger';
import { eventBus } from '$digerati/events';

export interface CopyrightYearOptions {
    /** CSS selector to target; defaults to `[dd-date="copyright-year"]` */
    selector?: string;
}

/**
 * Injects the current year into the DOM target and returns it.
 * Uses autoGroup for logging, and emits events on the eventBus.
 */
export const copyrightYear = (
    options: CopyrightYearOptions = {}
): string =>
    autoGroup('CopyrightYear', () => {
        const selector = options.selector ?? '[dd-date="copyright-year"]';
        const year = new Date().getFullYear().toString();
        const el = document.querySelector<HTMLElement>(selector);
        if (!el) {
            warn(`CopyrightYear: element not found for selector "${selector}"`);
            eventBus.emit('copyrightYear:missing', { selector });
            return year;
        }
        el.textContent = year;
        log(`CopyrightYear: injected "${year}" into "${selector}"`);
        eventBus.emit('copyrightYear:applied', { year, selector });
        return year;
    });

/**
 * Helper to retrieve the current year string without injection.
 */
export const getCopyrightYear = (): string =>
    new Date().getFullYear().toString();
