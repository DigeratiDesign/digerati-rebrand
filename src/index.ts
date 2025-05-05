import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { mouseTrail } from "$digerati/mouseTrail";
import { tallyModal } from "$digerati/tallyModal";
import { testimonialAvatar } from "$digerati/testimonialAvatar";
import { convertMarkdownToTable } from "$digerati/convertMarkdownToTable";

window.Webflow || [];
window.Webflow.push(() => {
  mouseTrail();
  convertMarkdownToTable();
  testimonialAvatar();
  skipToMainContent();
  tallyModal();
  currentYear();
});