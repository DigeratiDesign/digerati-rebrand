import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { mouseTrail } from "$digerati/mouseTrail";
import { tallyModal } from "$digerati/tallyModal";
import { testimonialAvatar } from "$digerati/testimonialAvatar";
import { convertMarkdownToTable } from "$digerati/convertMarkdownToTable";
import { reasonGenerator } from "$digerati/reasonGenerator";
import { linkHoverState, highlightText, unmaskText } from "$digerati/textEffects";
import { collectionSplitter } from "$digerati/collectionSplitter";

window.Webflow || [];
window.Webflow.push(() => {
  mouseTrail();
  collectionSplitter();
  convertMarkdownToTable();
  testimonialAvatar();
  reasonGenerator();
  skipToMainContent();
  tallyModal();
  currentYear();
  document.fonts.ready.then(function () {
    linkHoverState();
    highlightText();
    unmaskText();
  });
});