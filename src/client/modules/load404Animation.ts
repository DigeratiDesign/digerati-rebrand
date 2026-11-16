// Capture the shared classic script URL while it is executing, before DOM readiness.
// Resolve beside it so the existing Webflow embed also works on nested page URLs.
const script = document.currentScript as HTMLScriptElement | null;
const animationURL = new URL('animation404.js', script?.src || document.baseURI).href;

export const load404Animation = async (): Promise<void> => {
  if (!document.querySelector('[dd-animation="404"]')) return;
  const { init404Animation } = (await import(animationURL)) as typeof import('./animation404');
  init404Animation();
};
