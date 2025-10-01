// src/index.ts
import { domReady, webflowReady, ix2Ready, fontReady } from '$digerati/register';
import { eventBus, initEventDebugLogging } from '$digerati/events';
import { autoGroup } from '$digerati/utils/logger';
import * as Core from '$digerati/modules';
import * as Client from '$client/modules';
import { blurMessages } from '$client/constants/blurMessages';

initEventDebugLogging();

/** A single task function */
type Task = () => void;

/** A phase can optionally have tasks */
interface Phase {
  readyFn: (cb: () => void) => void;
  event: string;
  tasks?: Task[];
}

const PHASES = {
  domReady: {
    readyFn: domReady,
    event: 'core:domReady',
    tasks: [
      Core.collectionSplitter,
      Core.copyrightYear,
      Client.tally,
      Client.reasonGenerator,
      () => Client.initRandomBrandIcons({
        persist: 'none',
        cacheBust: true,
        cycle: { periodMs: 12000 } // ← enable cycling
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
      Client.initLegalColourCycle,
      () => Core.convertMarkdownToTable({
        selector: 'markdown',
        logOutput: true,
      }),
      () => Core.autoHideNavbarOnScroll({
        headerSelector: 'header',
        hiddenClass: 'navbar-hidden',
        injectCSS: true,
      }),
      () => Core.initPageBlurTitle({ messages: blurMessages }),
      () => Core.smoothScroll({ duration: 800, easing: 'easeOutCubic' }),
    ],
  },
  fontReady: {
    readyFn: fontReady,
    event: 'core:fontReady',
    // no tasks – and that’s fine
  },
  ix2Ready: {
    readyFn: ix2Ready,
    event: 'core:ix2Ready',
    tasks: [
      /* your GSAP/ScrollTrigger init */
    ],
  },
} satisfies Record<string, Phase>;

Object.values(PHASES).forEach(({ readyFn, event, tasks = [] }) => {
  readyFn(() => {
    autoGroup(event, () => {
      eventBus.emit(event, undefined);
      for (const fn of tasks) {
        try {
          fn();
        } catch (err) {
          console.error(`[${event}] task failed:`, err);
        }
      }
    });
  });
});
