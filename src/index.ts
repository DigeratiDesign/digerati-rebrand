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
      Core.copyrightYear,
      Client.tally,
      Client.reasonGenerator,
    ],
  },
  webflowReady: {
    readyFn: webflowReady,
    event: 'core:webflowReady',
    tasks: [
      Core.skipToMainContent,
      Client.testimonialAvatar,
      Client.mouseTrail,
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
      () => Core.initPageBlurTitleCycler({
        interval: 750,
        messages: blurMessages
      }),
      Core.collectionSplitter,
      () => Core.smoothScroll({
        duration: 800,
        easing: 'easeOutCubic'
      }),
    ],
  },
  fontReady: {
    readyFn: fontReady,
    event: 'core:fontReady',
    tasks: [
      Client.linkHoverState,
      Client.highlightText,
      Client.unmaskText
    ],
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