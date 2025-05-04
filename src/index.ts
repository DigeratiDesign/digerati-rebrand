import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { mouseTrail } from "$digerati/mouseTrail";
import { tallyModal } from "$digerati/tallyModal";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
  staggerTextOnHover();
  mouseTrail();
  const css = new HeroAnimationCssStyles(10, 6, '#FFFFFF', 230, 200);
  const html = new HeroAnimationHtml();
  css.init();
  html.init();
});