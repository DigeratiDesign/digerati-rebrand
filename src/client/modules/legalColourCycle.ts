// src/digerati/modules/legalColourCycle.ts

/**
 * Legal Colour Cycle.
 *
 * Finds all <strong> elements inside legal rich text headings (h2/h3)
 * and adds a "colour-cycle" class for styling/animation.
 *
 * Optionally observes DOM mutations to apply to late-loaded content.
 *
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface LegalColourCycleOptions {
    /** Scope to search within (rich text wrapper) */
    rootSelector?: string;
    /** Heading levels to target (comma-separated list, no spaces) */
    headingTags?: string; // e.g., "h2,h3"
    /** Class to add to the <strong> elements */
    className?: string; // default: "colour-cycle"
    /** If true, attaches a MutationObserver to catch late-added nodes */
    observe?: boolean;
    /** If true, removes className on destroy() */
    removeOnDestroy?: boolean;
}

export class LegalColourCycle {
    private rootSelector: string;
    private headingTags: string;
    private className: string;
    private observe: boolean;
    private removeOnDestroy: boolean;

    private observer?: MutationObserver;
    private applied: Set<HTMLElement>;

    constructor(opts: LegalColourCycleOptions = {}) {
        this.rootSelector = opts.rootSelector ?? ".text-rich-text.is-legal";
        this.headingTags = opts.headingTags ?? "h2,h3";
        this.className = opts.className ?? "colour-cycle";
        this.observe = opts.observe ?? false;
        this.removeOnDestroy = opts.removeOnDestroy ?? false;
        this.applied = new Set<HTMLElement>();
    }

    /** Build a selector like ".text-rich-text.is-legal h2 strong, .text-rich-text.is-legal h3 strong" */
    private get targetSelector(): string {
        const parts = this.headingTags.split(",").map(tag => tag.trim()).filter(Boolean);
        if (!parts.length) return `${this.rootSelector} strong`;
        return parts.map(tag => `${this.rootSelector} ${tag} strong`).join(", ");
    }

    /** Apply class to all matching nodes in the current DOM (idempotent) */
    private scanAndApply(scope: ParentNode = document): number {
        const nodes = Array.from(scope.querySelectorAll<HTMLElement>(this.targetSelector));
        if (!nodes.length) return 0;

        let appliedCount = 0;
        nodes.forEach(el => {
            if (!el.classList.contains(this.className)) {
                el.classList.add(this.className);
                this.applied.add(el);
                appliedCount++;
            }
        });

        return appliedCount;
    }

    /** Initialize: apply now and (optionally) begin observing for changes */
    public init() {
        autoGroup("LegalColourCycle", () => {
            const total = this.scanAndApply();

            if (total === 0) {
                warn(`[LegalColourCycle] no matches for selector "${this.targetSelector}"`);
                eventBus.emit("legalColourCycle:noneFound", { selector: this.targetSelector });
            } else {
                log(`LegalColourCycle applied to ${total} element(s).`);
                eventBus.emit("legalColourCycle:applied", { count: total, selector: this.targetSelector });
            }

            if (this.observe) {
                const root = document.querySelector(this.rootSelector) ?? document.body;
                this.observer = new MutationObserver(mutations => {
                    let delta = 0;
                    mutations.forEach(m => {
                        // Check newly added nodes and their descendants
                        m.addedNodes.forEach(node => {
                            if (!(node instanceof Element)) return;
                            // Apply to the element itself (if it matches) and its descendants
                            if (node.matches?.(this.targetSelector)) {
                                const el = node as HTMLElement;
                                if (!el.classList.contains(this.className)) {
                                    el.classList.add(this.className);
                                    this.applied.add(el);
                                    delta++;
                                }
                            }
                            delta += this.scanAndApply(node);
                        });
                    });
                    if (delta > 0) {
                        log(`LegalColourCycle observed and applied to ${delta} new element(s).`);
                        eventBus.emit("legalColourCycle:appliedObserved", { count: delta });
                    }
                });

                this.observer.observe(root, {
                    subtree: true,
                    childList: true,
                });

                log("LegalColourCycle observer attached.");
                eventBus.emit("legalColourCycle:observerAttached", { root: this.rootSelector });
            }

            eventBus.emit("legalColourCycle:initialized", {
                selector: this.targetSelector,
                observed: this.observe,
                initialCount: total,
            });
        });
    }

    /** Tear down: stop observing and optionally remove the class from previously touched nodes */
    public destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = undefined;
            log("LegalColourCycle observer disconnected.");
            eventBus.emit("legalColourCycle:observerDisconnected", {});
        }

        if (this.removeOnDestroy && this.applied.size) {
            let removed = 0;
            this.applied.forEach(el => {
                if (el.isConnected && el.classList.contains(this.className)) {
                    el.classList.remove(this.className);
                    removed++;
                }
            });
            log(`LegalColourCycle removed class from ${removed} element(s).`);
            eventBus.emit("legalColourCycle:removedOnDestroy", { count: removed });
        }

        this.applied.clear();
        log("LegalColourCycle destroyed.");
        eventBus.emit("legalColourCycle:destroyed", {});
    }
}

/** Convenience initializer */
export const initLegalColourCycle = (opts?: LegalColourCycleOptions) => {
    const instance = new LegalColourCycle(opts);
    instance.init();
    return instance;
};
