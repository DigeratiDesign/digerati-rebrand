// src/digerati/modules/collectionSplitter.ts

/**
 * Collection Splitter.
 * 
 * Splits a list of items in half (or custom split) by cloning the wrapper
 * and slicing the items.
 * 
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface CollectionSplitterOptions {
    wrapperSelector?: string;               // default '[dd-splitter="list-wrapper"]'
    itemSelector?: string;                  // default '[dd-splitter="list-item"]'
    splitAt?: (total: number) => number;    // custom split function; default is ceil(total/2)
}

export const collectionSplitter = (opts: CollectionSplitterOptions = {}) => {
    autoGroup("Collection Splitter", () => {
        const wrapperSelector = opts.wrapperSelector ?? '[dd-splitter="list-wrapper"]';
        const itemSelector = opts.itemSelector ?? '[dd-splitter="list-item"]';

        const target = document.querySelector<HTMLElement>(wrapperSelector);
        if (!target) {
            warn(`Target not found for selector "${wrapperSelector}".`);
            eventBus.emit("collectionSplitter:missingTarget", { selector: wrapperSelector });
            return;
        }

        const itemsNodeList = target.querySelectorAll<HTMLElement>(itemSelector);
        const totalItems = itemsNodeList.length;
        log("Total items found:", totalItems);

        if (totalItems === 0) {
            warn("No items to split.");
            eventBus.emit("collectionSplitter:empty", { selector: wrapperSelector });
            return;
        }

        const perSplit = opts.splitAt ? opts.splitAt(totalItems) : Math.ceil(totalItems / 2);
        log(`Splitting ${totalItems} items at ${perSplit}.`);

        // Clone wrapper and insert after original
        const duplicate = target.cloneNode(true) as HTMLElement;
        if (target.parentNode) {
            target.parentNode.insertBefore(duplicate, target.nextSibling);
        } else {
            warn("Cannot insert duplicate: original has no parent.");
        }

        // Operate on items
        const originalItems = Array.from(target.querySelectorAll<HTMLElement>(itemSelector));
        const duplicateItems = Array.from(duplicate.querySelectorAll<HTMLElement>(itemSelector));

        originalItems.slice(perSplit).forEach((item) => item.remove());
        duplicateItems.slice(0, perSplit).forEach((item) => item.remove());

        eventBus.emit("collectionSplitter:performed", {
            total: totalItems,
            perSplit,
            firstCount: perSplit,
            secondCount: totalItems - perSplit
        });
    });
};
