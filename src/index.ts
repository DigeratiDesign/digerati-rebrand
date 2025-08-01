import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { mouseTrail } from "$digerati/mouseTrail";
import { smoothScroll } from "$digerati/smoothScroll";
import { tally } from "$digerati/tally";
import { testimonialAvatar } from "$digerati/testimonialAvatar";
import { autoHideHeader } from "$digerati/autoHideHeader";
import { initPageBlurTitleCycler } from "$digerati/pageBlurTitleCycler";
import { linkHoverState, highlightText, unmaskText } from "$digerati/textEffects";
import { collectionSplitter } from "$digerati/collectionSplitter";
import { convertMarkdownToTable } from "$digerati/convertMarkdownToTable";
import { reasonGenerator } from "$digerati/reasonGenerator";

window.Webflow ||= [];
window.Webflow.push(async () => {
  currentYear();
  skipToMainContent();
  testimonialAvatar();
  mouseTrail();
  linkHoverState();
  autoHideHeader({
    headerSelector: "header",
    hiddenClass: "navbar-hidden",
    injectCSS: true
  });
  Tally();
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
});

smoothScroll({
  duration: 800,
  easing: "easeOutCubic"
});

// tallyModal();
collectionSplitter();
/*convertMarkdownToTable();
reasonGenerator();
*/
/*
document.fonts.ready.then(() => {
  linkHoverState();
  highlightText();
  unmaskText();
});
*/
