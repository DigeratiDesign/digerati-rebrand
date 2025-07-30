import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { mouseTrail } from "$digerati/mouseTrail";
import { tallyModal } from "$digerati/tallyModal";
import { testimonialAvatar } from "$digerati/testimonialAvatar";
import { convertMarkdownToTable } from "$digerati/convertMarkdownToTable";
import { reasonGenerator } from "$digerati/reasonGenerator";
import { linkHoverState, highlightText, unmaskText } from "$digerati/textEffects";
import { collectionSplitter } from "$digerati/collectionSplitter";

window.Webflow ||= [];
window.Webflow.push(async () => {
  currentYear();
  skipToMainContent();
  testimonialAvatar();
  mouseTrail();
  linkHoverState();
});

collectionSplitter();
convertMarkdownToTable();
reasonGenerator();
tallyModal();

/*
document.fonts.ready.then(() => {
  linkHoverState();
  highlightText();
  unmaskText();
});
*/