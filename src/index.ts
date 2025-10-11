// src/index.ts
import { domReady, webflowReady, ix2Ready, fontReady } from '$digerati/register';
import { eventBus, initEventDebugLogging } from '$digerati/events';
import type { AppEvents } from '$digerati/events/types';
import { autoGroup } from '$digerati/utils/logger';
import * as Core from '$digerati/modules';
import * as Client from '$client/modules';


initEventDebugLogging();

/** A single task function */
type Task = () => void;

/** A phase can optionally have tasks */
interface Phase<K extends keyof AppEvents = keyof AppEvents> {
  readyFn: (cb: () => void) => void;
  event: K;
  tasks?: Task[];
}

const PHASES = {
  domReady: {
    readyFn: domReady,
    event: 'core:domReady',
    tasks: [
      () =>
        Core.widowControl({
          skipSelectors: ['[aria-hidden="true"]', '.no-widow'],
        }),
      Core.collectionSplitter,
      Core.copyrightYear,
      Client.tally,
      Client.reasonGenerator,
      Client.initLegalColourCycle,
      () =>
        Core.convertMarkdownToTable({
          selector: 'markdown',
          logOutput: true,
        }),
    ],
  },
  webflowReady: {
    readyFn: webflowReady,
    event: 'core:webflowReady',
    tasks: [
      Client.initAutoHideAccordionItem,
      Core.skipToMainContent,
      Client.testimonialAvatar,
      () =>
        Core.autoHideNavbarOnScroll({
          headerSelector: 'header',
          hiddenClass: 'navbar-hidden',
          injectCSS: true,
        }),
      () => Core.smoothScroll({ duration: 800, easing: 'easeOutCubic' }),
      Client.faviconHueRotateStepped,
    ],
  },
  fontReady: {
    readyFn: fontReady,
    event: 'core:fontReady',
    tasks: []
  },
  ix2Ready: {
    readyFn: ix2Ready,
    event: 'core:ix2Ready',
    tasks: [
      Client.lottieInit,
    ],
  },
} satisfies Record<string, Phase>;

Object.values(PHASES).forEach(({ readyFn, event, tasks = [] }) => {
  readyFn(() => {
    autoGroup(event, () => {
      eventBus.emit(event);
      tasks.forEach((fn, i) => {
        try {
          if (typeof fn === "function") {
            fn();
          } else {
            console.warn(`[${event}] skipped non-function task at index ${i}:`, fn);
          }
        } catch (err) {
          console.error(`[${event}] task failed:`, err);
        }
      });
    });
  });
});