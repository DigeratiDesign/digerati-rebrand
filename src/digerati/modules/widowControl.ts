// src/digerati/modules/widowControl.ts

/**
 * Widow Control (keep last N words together).
 *
 * For each target element, replace the final (N-1) breaking spaces
 * in its text nodes with NBSP so the last N words stay together.
 *
 * - No layout reads or measurement.
 * - Preserves HTML structure and IX2/event bindings (mutates Text nodes only).
 * - Skips elements with too few words.
 *
 * @author <cabal@digerati.design>
 */

import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface WidowControlOptions {
    selector?: string;         // default 'p, h1, h2, h3, h4, h5, h6, li'
    skipSelectors?: string[];  // e.g. ['[aria-hidden="true"]', '.no-widow']
    nowrapCount?: number;      // keep last N words together; default 2 (min 2)
    markAttr?: string;         // attribute set after processing; default 'data-dd-widow'
}

export const widowControl = (opts: WidowControlOptions = {}) => {
    autoGroup("Widow Control", () => {
        const selector = opts.selector ?? "p, h1, h2, h3, h4, h5, h6";
        const skipSelectors = opts.skipSelectors ?? [];
        const nowrapCount = Math.max(2, opts.nowrapCount ?? 2);
        const markAttr = opts.markAttr ?? "data-dd-widow";

        const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
        if (targets.length === 0) {
            warn(`No targets found for selector "${selector}".`);
            eventBus.emit("widow:empty", { selector });
            return;
        }

        log(`Processing ${targets.length} elements (nowrapCount=${nowrapCount}).`);

        targets.forEach((el) => {
            if (el.hasAttribute(markAttr)) return; // already processed
            if (skipSelectors.length && el.matches(skipSelectors.join(","))) return;

            const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
            const wordCount = text ? text.split(" ").filter(Boolean).length : 0;

            if (wordCount < nowrapCount) {
                el.setAttribute(markAttr, "skipped-too-few-words");
                eventBus.emit("widow:skipped", { el, reason: "tooFewWords" });
                return;
            }

            const fixed = keepLastNWordsTogether(el, nowrapCount);
            if (fixed) {
                el.setAttribute(markAttr, "fixed");
                eventBus.emit("widow:fixed", { el, nowrapCount });
            } else {
                el.setAttribute(markAttr, "noop");
                eventBus.emit("widow:noop", { el });
            }
        });

        log("Widow Control complete.");
    });
};

/**
 * Replace the last (N-1) breaking spaces in the flattened textContent
 * with NBSPs by mutating the correct Text nodes.
 */
function keepLastNWordsTogether(root: HTMLElement, n: number): boolean {
    const flat = (root.textContent ?? "").replace(/\s+/g, " ").replace(/\s+$/g, "");
    if (!flat) return false;

    const need = n - 1;
    const spacePositions: number[] = [];
    let idx = flat.length;

    while (spacePositions.length < need) {
        idx = flat.lastIndexOf(" ", idx - 1);
        if (idx === -1) break;
        spacePositions.push(idx);
    }

    if (spacePositions.length < need) return false;

    // Replace from end to start to avoid index drift
    const NBSP = "\u00A0";
    for (const globalPos of spacePositions) {
        if (!replaceSpaceAt(root, globalPos, NBSP)) return false;
    }
    return true;
}

/**
 * Map a global text index into the appropriate Text node and replace
 * the single space character there with the provided replacement.
 */
function replaceSpaceAt(root: HTMLElement, globalIndex: number, replacement: string): boolean {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => (/\S/.test(node.nodeValue ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });

    let offset = 0;
    let node = walker.nextNode() as Text | null;

    while (node) {
        const val = node.nodeValue ?? "";
        const len = val.length;

        if (globalIndex >= offset && globalIndex < offset + len) {
            const local = globalIndex - offset;
            if (val.charAt(local) !== " ") return false; // sanity check
            node.nodeValue = val.slice(0, local) + replacement + val.slice(local + 1);
            return true;
        }

        offset += len;
        node = walker.nextNode() as Text | null;
    }
    return false;
}

// Example usage:
// widowControl({
//   selector: "p, h1, h2, h3, h4, h5, h6",
//   skipSelectors: ['[aria-hidden="true"]', '.no-widow'],
//   nowrapCount: 2,
//   markAttr: "data-dd-widow"
// });
