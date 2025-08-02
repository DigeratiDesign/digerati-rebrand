import { domReady, webflowReady, ix2Ready, fontReady } from "$digerati/ready";
import { eventBus, initEventDebugLogging } from "$digerati/events";
import { autoGroup } from "$digerati/utils/logger";

import { skipToMainContent } from "$digerati/modules/skipToMainContent";
import { CurrentYear } from "$digerati/modules/currentYear";
import { smoothScroll } from "$digerati/modules/smoothScroll";
import { autoHideNavbarOnScroll } from "$digerati/modules/autoHideNavbarOnScroll";
import { initPageBlurTitleCycler } from "$digerati/modules/pageBlurTitleCycler";
import { collectionSplitter } from "$digerati/modules/collectionSplitter";
import { initColourCycle } from "$client/modules/colourCycle";

import { convertMarkdownToTable } from "$digerati/modules/convertMarkdownToTable";

import { mouseTrail } from "$client/modules/mouseTrail";
import { tally } from "$client/modules/tally";
import { testimonialAvatar } from "$client/modules/testimonialAvatar";
import { linkHoverState, highlightText, unmaskText } from "$client/modules/textEffects";
import { reasonGenerator } from "$client/modules/reasonGenerator";

/* ------------------ GLOBAL DEBUG / EVENT HOOKS ------------------ */
// Register debug logging for events as early as possible
initEventDebugLogging();

/* ------------------ DOM READY ------------------ */
domReady(() => {
  autoGroup("DOM Ready", () => {
    eventBus.emit("core:domReady", undefined);
    // tally only needs the DOM
    CurrentYear.inject();
    tally();
    reasonGenerator();
  });
});

/* ------------------ WEBFLOW READY ------------------ */
webflowReady(() => {
  autoGroup("Webflow Ready", () => {
    eventBus.emit("core:webflowReady", undefined);

    skipToMainContent();
    testimonialAvatar();
    mouseTrail();
    initColourCycle();
    convertMarkdownToTable({ selector: "markdown", logOutput: true });

    autoHideNavbarOnScroll({
      headerSelector: "header",
      hiddenClass: "navbar-hidden",
      injectCSS: true
    });

    initPageBlurTitleCycler({
      interval: 750,
      messages: [
        "It's not a conspiracy...",
        "Digerati says: Consume",
        "It's not a conspiracy...",
        "Digerati says: Obey",
        "It's not a conspiracy...",
        "Digerati says: Don't think",
        "It's not a conspiracy...",
        "Digerati says: Stay asleep",
        "It's not a conspiracy...",
        "Digerati says: Watch TV",
        "It's not a conspiracy...",
        "Digerati says: Conform",
        "It's not a conspiracy...",
        "Digerati says: Work 8 hours",
        "It's not a conspiracy...",
        "Digerati says: Sleep 8 hours",
        "It's not a conspiracy...",
        "Digerati says: Play 8 hours",
        "It's not a conspiracy...",
        "Digerati says: Submit",
        "It's not a conspiracy...",
        "Digerati says: Follow",
        "It's not a conspiracy...",
        "Digerati says: Buy",
        "It's not a conspiracy...",
        "Digerati says: Honour apathy"
      ]
    });

    collectionSplitter();

    smoothScroll({
      duration: 800,
      easing: "easeOutCubic"
    });
  });
});

/* ------------------ FONT READY ------------------ */
fontReady(() => {
  autoGroup("Font Ready", () => {
    eventBus.emit("core:fontReady", undefined);

    // Effects that depend on font metrics / rendering
    linkHoverState();
    highlightText();
    unmaskText();
  });
});

/* ------------------ IX2 / GSAP READY ------------------ */
ix2Ready(() => {
  autoGroup("IX2 Ready", () => {
    eventBus.emit("core:ix2Ready", undefined);
    // Placeholder: any GSAP or interaction logic that must wait until IX2 is fully ready
    // e.g. initGsapAnimations();
  });
});
