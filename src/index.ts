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
      "It's not a conspiracy",
      "Consume",
      "Obey",
      "No thought",
      "Stay asleep",
      "Watch TV",
      "Conform",
      "Work 8 hours",
      "Sleep 8 hours",
      "Play 8 hours",
      "Doubt humanity",
      "Marry & reproduce",
      "Submit",
      "Follow",
      "Buy",
      "No imagination",
      "Honour apathy"
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
