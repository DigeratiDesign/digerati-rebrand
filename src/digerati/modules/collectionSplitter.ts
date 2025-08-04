// src/digerati/modules/collectionSplitter.ts

/**
 * Collection Splitter (Move-based).
 *
 * Instead of cloning, this version moves the original elements,
 * wrapping the first half in one container and the second half in another.
 * This preserves all existing event bindings and IX2 interactions.
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
    autoGroup("Collection Splitter (move-based)", () => {
        const wrapperSelector = opts.wrapperSelector ?? '[dd-splitter="list-wrapper"]';
        const itemSelector = opts.itemSelector ?? '[dd-splitter="list-item"]';

        const originalWrapper = document.querySelector<HTMLElement>(wrapperSelector);
        if (!originalWrapper) {
            warn(`Target not found for selector "${wrapperSelector}".`);
            eventBus.emit("collectionSplitter:missingTarget", { selector: wrapperSelector });
            return;
        }

        const items = Array.from(originalWrapper.querySelectorAll<HTMLElement>(itemSelector));
        const totalItems = items.length;
        log("Total items found:", totalItems);

        if (totalItems === 0) {
            warn("No items to split.");
            eventBus.emit("collectionSplitter:empty", { selector: wrapperSelector });
            return;
        }

        const splitIndex = opts.splitAt ? opts.splitAt(totalItems) : Math.ceil(totalItems / 2);
        log(`Splitting ${totalItems} items at index ${splitIndex}.`);

        const parent = originalWrapper.parentNode;
        if (!parent) {
            warn("Original wrapper has no parent.");
            return;
        }

        // Create two new wrapper containers matching the original
        const containerA = document.createElement(originalWrapper.tagName);
        const containerB = document.createElement(originalWrapper.tagName);

        // Copy attributes (classes, data-attrs) from the original wrapper
        Array.from(originalWrapper.attributes).forEach(attr => {
            containerA.setAttribute(attr.name, attr.value);
            containerB.setAttribute(attr.name, attr.value);
        });

        // Move items into the new containers
        items.forEach((item, idx) => {
            if (idx < splitIndex) {
                containerA.appendChild(item);
            } else {
                containerB.appendChild(item);
            }
        });

        // Replace original wrapper with the two new containers
        parent.insertBefore(containerA, originalWrapper);
        parent.insertBefore(containerB, originalWrapper);
        parent.removeChild(originalWrapper);

        log("Collection split by moving elements, preserving IX2.");
        eventBus.emit("collectionSplitter:performed", {
            total: totalItems,
            splitIndex,
            firstCount: splitIndex,
            secondCount: totalItems - splitIndex
        });
    });
};