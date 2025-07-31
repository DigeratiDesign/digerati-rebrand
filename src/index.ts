import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { mouseTrail } from "$digerati/mouseTrail";
import { smoothScroll } from "$digerati/smoothScroll";
import { tallyModal } from "$digerati/tallyModal";
import { testimonialAvatar } from "$digerati/testimonialAvatar";
import { autoHideHeader } from "$digerati/autoHideHeader";
import { initPageBlurTitleCycler } from "$digerati/pageBlutTitleCycler";
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
  initPageBlurTitleCycler({
    interval: 750,
    messages: [
      "It's not a conspiracy...",
      "Digerati says: Consume",
      "Digerati says: Obey",
      "Digerati says: Don't think",
      "Digerati says: Stay asleep",
      "Digerati says: Watch TV",
      "Digerati says: Conform",
      "Digerati says: Work 8 hours",
      "Digerati says: Sleep 8 hours",
      "Digerati says: Play 8 hours",
      "Digerati says: Submit",
      "Digerati says: Follow",
      "Digerati says: Buy",
      "Digerati says: Honour apathy"
    ],
  });
});

smoothScroll({
  duration: 800,
  easing: "easeOutCubic"
});

tallyModal();
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
