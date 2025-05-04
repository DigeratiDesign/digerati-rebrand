import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { mouseTrail } from "$digerati/mouseTrail";
import { tallyModal } from "$digerati/tallyModal";
import { testimonialAvatar } from "$digerati/testimonialAvatar";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
  mouseTrail();
  tallyModal();
  testimonialAvatar();
});