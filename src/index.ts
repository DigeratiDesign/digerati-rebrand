// src/index.ts

import { domReady, webflowReady, ix2Ready, fontReady } from '$digerati/register';
import { eventBus, initEventDebugLogging } from '$digerati/events';
import { autoGroup } from '$digerati/utils/logger';
import * as Core from '$digerati/modules';
import * as Client from '$client/modules';
import { blurMessages } from '$client/constants/blurMessages';

initEventDebugLogging();

const PHASES = {
  domReady: {
    readyFn: domReady,
    event: 'core:domReady',
    tasks: [
      Core.collectionSplitter,
      Core.copyrightYear,
      Client.tally,
      Client.reasonGenerator,
    ],
  },
  webflowReady: {
    readyFn: webflowReady,
    event: 'core:webflowReady',
    tasks: [
      Client.initAutoHideAccordionItem,
      Core.skipToMainContent,
      Client.testimonialAvatar,
      Client.initColourCycle,
      () => Core.convertMarkdownToTable({
        selector: 'markdown',
        logOutput: true
      }),
      () => Core.autoHideNavbarOnScroll({
        headerSelector: 'header',
        hiddenClass: 'navbar-hidden',
        injectCSS: true
      }),
      () => Core.initPageBlurTitle({
        messages: blurMessages
      }),
      () => Core.smoothScroll({
        duration: 800,
        easing: 'easeOutCubic'
      }),
    ],
  },
  fontReady: {
    readyFn: fontReady,
    event: 'core:fontReady',
  },
  ix2Ready: {
    readyFn: ix2Ready,
    event: 'core:ix2Ready',
    tasks: [
      /* your GSAP/ScrollTrigger init */
    ],
  },
};

Object.values(PHASES).forEach(({ readyFn, event, tasks }) => {
  readyFn(() => {
    autoGroup(event, () => {
      eventBus.emit(event, undefined);
      tasks.forEach(fn => fn());
    });
  });
});