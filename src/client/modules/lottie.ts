// src/client/modules/lottie.ts
import lottie from 'lottie-web';
import { eventBus } from '$digerati/events';
import { log } from '$digerati/utils/logger';

export function lottieInit() {
  const containers = document.querySelectorAll<HTMLElement>('[dd-lottie]');
  const now = () => new Date().toISOString().split('T')[1].replace('Z', '');

  eventBus.emit('lottie:init', { count: containers.length });
  log(`[Lottie] Found ${containers.length} elements`);

  // We still detect iOS, but no longer change renderer type.
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

  // Active animations tracking
  let activeIOS: ReturnType<typeof lottie.loadAnimation> | null = null;
  let iosToPause: ReturnType<typeof lottie.loadAnimation> | null = null;

  const activeDesktop: ReturnType<typeof lottie.loadAnimation>[] = [];
  const desktopToPause: Set<ReturnType<typeof lottie.loadAnimation>> = new Set();

  const waitForLayout = (el: HTMLElement, callback: () => void) => {
    let lastW = 0,
      lastH = 0,
      stable = 0;
    const check = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width && height && width === lastW && height === lastH) stable++;
      else {
        stable = 0;
        lastW = width;
        lastH = height;
      }
      if (stable >= 2) callback();
      else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  };

  containers.forEach((container) => {
    let animation: ReturnType<typeof lottie.loadAnimation> | null = null;
    let isVisible = false;
    let pendingDestroy = false;

    const createAnimation = () => {
      if (animation) return;
      const path = container.getAttribute('dd-lottie')!;
      log(`[${now()}] 🎬 Creating animation for`, container);
      const created = lottie.loadAnimation({
        container,
        renderer: 'svg', // ✅ Always SVG now
        loop: true,
        autoplay: true,
        path,
      });

      animation = created;
      eventBus.emit('lottie:created', { element: container, path });

      created.addEventListener('loopComplete', () => {
        // iOS deferred pause
        if (iosToPause === created) {
          log(`[${now()}] ⏸️ Pausing previous iOS animation after loop`);
          created.pause();
          iosToPause = null;
          eventBus.emit('lottie:paused', { element: container });
        }

        // Desktop deferred pause
        if (desktopToPause.has(created)) {
          log(`[${now()}] ⏸️ Pausing old desktop animation after loop`);
          created.pause();
          desktopToPause.delete(created);
          const index = activeDesktop.indexOf(created);
          if (index >= 0) activeDesktop.splice(index, 1);
          eventBus.emit('lottie:paused', { element: container });
        }

        // Handle deferred destroy
        if (pendingDestroy && !isVisible) {
          created.destroy();
          eventBus.emit('lottie:destroyed', { element: container });
          if (animation === created) animation = null;
          pendingDestroy = false;
        } else if (pendingDestroy && isVisible) {
          pendingDestroy = false;
        }
      });
    };

    const destroyAnimation = () => {
      if (!animation) return;
      log(`[${now()}] ❌ Destroying animation for`, container);

      if (activeIOS === animation) activeIOS = null;
      const i = activeDesktop.indexOf(animation);
      if (i >= 0) activeDesktop.splice(i, 1);
      desktopToPause.delete(animation);

      animation.destroy();
      eventBus.emit('lottie:destroyed', { element: container });
      animation = null;
    };

    const handleVisibility = (visible: boolean) => {
      if (visible && !isVisible) {
        eventBus.emit('lottie:entered', { element: container });
        pendingDestroy = false;

        waitForLayout(container, () => {
          createAnimation();

          // Still limit iOS to one at a time, but all SVG now
          if (isIOS && animation) {
            if (activeIOS && activeIOS !== animation) iosToPause = activeIOS;
            activeIOS = animation;
            animation.play();
            return;
          }

          // Desktop: max 2 concurrent
          if (animation) {
            if (activeDesktop.length >= 2) {
              const oldest = activeDesktop[0];
              if (oldest && !desktopToPause.has(oldest)) {
                desktopToPause.add(oldest);
                log(`[${now()}] 🎬 Queued oldest desktop animation to pause after loop`);
              }
            }
            if (!activeDesktop.includes(animation)) activeDesktop.push(animation);
            animation.play();
          }
        });
      } else if (!visible && isVisible) {
        eventBus.emit('lottie:exited', { element: container });
        if (animation) pendingDestroy = true;
        else destroyAnimation();
      }
      isVisible = visible;
    };

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => handleVisibility(entry.isIntersecting)),
      { threshold: 0.2 }
    );

    observer.observe(container);
  });
}
