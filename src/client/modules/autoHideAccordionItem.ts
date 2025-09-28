// src/digerati/modules/autoHideAccordionItem.ts

/**
 * AutoHideAccordionItem
 *
 * Ensures only one accordion-content-item is open at a time by
 * auto-closing any other open items (via Webflow click) when
 * a new item is clicked, preserving Webflow IX2 animations.
 *
 * Listens in capture phase to let Webflow handlers run on bubble.
 *
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface AutoHideAccordionItemOptions {
    /** selector for the clickable accordion item */
    itemSelector?: string;
    /** selector for the wrapper whose height indicates open/closed */
    wrapSelector?: string;
}

export class AutoHideAccordionItem {
    private items: HTMLElement[];
    private itemSelector: string;
    private wrapSelector: string;
    private boundClick: EventListener;

    constructor(opts: AutoHideAccordionItemOptions = {}) {
        this.itemSelector = opts.itemSelector ?? ".accordion-content-item";
        this.wrapSelector = opts.wrapSelector ?? ".accordion-content-wrap";
        this.boundClick = this.handleClick.bind(this);
        this.items = Array.from(document.querySelectorAll<HTMLElement>(this.itemSelector));

        if (!this.items.length) {
            warn(`[AutoHideAccordionItem] no items found for selector "${this.itemSelector}"`);
            eventBus.emit("autoHideAccordionItem:missingItems", { selector: this.itemSelector });
        }
    }

    private handleClick(e: MouseEvent) {
        // Only react to genuine user clicks
        if (!e.isTrusted) return;

        const clickedItem = e.currentTarget as HTMLElement;

        // Close any other open items
        this.items.forEach(item => {
            if (item === clickedItem) return;
            const wrap = item.querySelector<HTMLElement>(this.wrapSelector);
            if (wrap && window.getComputedStyle(wrap).height !== "0px") {
                // Programmatically trigger Webflow close
                item.click();
                log("AutoHideAccordionItem closed sibling:", item);
                eventBus.emit("autoHideAccordionItem:closedSibling", { closed: item });
            }
        });

        // Let the original click proceed to Webflow
    }

    /** Attach listeners to all accordion items */
    public init() {
        autoGroup("AutoHideAccordionItem", () => {
            this.items.forEach(item => {
                // use capture phase so we close siblings before Webflow opens this one
                item.addEventListener("click", this.boundClick, true);
            });
            log("AutoHideAccordionItem initialized with items count:", this.items.length);
            eventBus.emit("autoHideAccordionItem:initialized", { count: this.items.length });
        });
    }

    /** Remove all listeners */
    public destroy() {
        this.items.forEach(item => {
            item.removeEventListener("click", this.boundClick, true);
        });
        log("AutoHideAccordionItem destroyed");
        eventBus.emit("autoHideAccordionItem:destroyed", {});
    }
}

/** Convenience initializer */
export const initAutoHideAccordionItem = (opts?: AutoHideAccordionItemOptions) => {
    const instance = new AutoHideAccordionItem(opts);
    instance.init();
    return instance;
};

