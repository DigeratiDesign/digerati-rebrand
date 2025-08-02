/**
 * Colour Cycle / Preloader Activation
 * Adds the active class to `.colour-cycle` and `.preloader` elements and notifies via eventBus.
 * 
 * @author <cabal@digerati.design>
 */
import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface ColourCycleOptions {
  selector?: string;
  activeClass?: string;
}

const DEFAULT_SELECTOR = ".colour-cycle, .preloader";
const DEFAULT_ACTIVE_CLASS = "is-active";

export const initColourCycle = (options: ColourCycleOptions = {}) => {
  const selector = options.selector ?? DEFAULT_SELECTOR;
  const activeClass = options.activeClass ?? DEFAULT_ACTIVE_CLASS;

  autoGroup("Colour Cycle Activation", () => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!elements.length) {
      warn(`No elements found for selector "${selector}" to activate.`);
      return;
    }

    elements.forEach((el) => el.classList.add(activeClass));
    log(`Added class '${activeClass}' to ${elements.length} element(s) matching '${selector}'.`);

    // Notify others that UI elements were activated
    eventBus.emit("ui:activated", {
      selector,
      count: elements.length,
      activeClass,
    });
  });
};
