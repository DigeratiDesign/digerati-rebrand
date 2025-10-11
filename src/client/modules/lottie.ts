import lottie from 'lottie-web';

export function lottieInit() {
  const containers = document.querySelectorAll<HTMLElement>('[dd-lottie]');
  const now = () => new Date().toISOString().split('T')[1].replace('Z', '');

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

  // iOS state
  let activeIOS: ReturnType<typeof lottie.loadAnimation> | null = null;
  let iosToPause: ReturnType<typeof lottie.loadAnimation> | null = null;

  // Desktop/Android: track active animations (max 2)
  const activeDesktop: ReturnType<typeof lottie.loadAnimation>[] = [];
  const desktopToPause: Set<ReturnType<typeof lottie.loadAnimation>> = new Set();

  const waitForLayout = (el: HTMLElement, callback: () => void) => {
    let lastW = 0,
      lastH = 0,
      stable = 0;
    const check = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width && height && width === lastW && height === lastH) {
        stable++;
      } else {
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
      console.log(`[${now()}] 🎬 Creating animation for`, container);
      animation = lottie.loadAnimation({
        container,
        renderer: isIOS ? 'canvas' : 'svg', // 👈 canvas on iOS
        loop: true,
        autoplay: true,
        path: container.getAttribute('dd-lottie')!,
      });

      animation.addEventListener('loopComplete', () => {
        // ✅ Handle iOS deferred pause
        if (isIOS && iosToPause === animation) {
          console.log(`[${now()}] ⏸️ Pausing previous iOS animation after loop`);
          animation.pause();
          iosToPause = null;
        }

        // ✅ Handle desktop deferred pause
        if (!isIOS && desktopToPause.has(animation)) {
          console.log(`[${now()}] ⏸️ Pausing old desktop animation after loop`);
          animation.pause();
          desktopToPause.delete(animation);
          const index = activeDesktop.indexOf(animation);
          if (index >= 0) activeDesktop.splice(index, 1);
        }

        if (pendingDestroy && !isVisible) {
          animation?.destroy();
          animation = null;
          pendingDestroy = false;
        } else if (pendingDestroy && isVisible) {
          pendingDestroy = false;
        }
      });
    };

    const destroyAnimation = () => {
      if (!animation) return;
      console.log(`[${now()}] ❌ Destroying animation for`, container);

      // Remove from tracking arrays
      if (isIOS && activeIOS === animation) activeIOS = null;
      if (!isIOS) {
        const i = activeDesktop.indexOf(animation);
        if (i >= 0) activeDesktop.splice(i, 1);
        desktopToPause.delete(animation);
      }

      animation.destroy();
      animation = null;
    };

    const handleVisibility = (visible: boolean) => {
      if (visible && !isVisible) {
        pendingDestroy = false;

        waitForLayout(container, () => {
          createAnimation();

          // ✅ iOS: only one active at a time, previous finishes its loop
          if (isIOS && animation) {
            if (activeIOS && activeIOS !== animation) {
              iosToPause = activeIOS;
            }
            activeIOS = animation;
            animation.play();
            return;
          }

          // ✅ Desktop: max 2 concurrent
          if (animation && !isIOS) {
            // If there are already 2 playing, queue the oldest to pause after loop
            if (activeDesktop.length >= 2) {
              const oldest = activeDesktop[0];
              if (oldest && !desktopToPause.has(oldest)) {
                desktopToPause.add(oldest);
                console.log(`[${now()}] 🎬 Queued oldest desktop animation to pause after loop`);
              }
            }
            // Add this animation to active list and play
            if (!activeDesktop.includes(animation)) activeDesktop.push(animation);
            animation.play();
          }
        });
      } else if (!visible && isVisible) {
        if (animation) pendingDestroy = true;
        else destroyAnimation();
      }
      isVisible = visible;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => handleVisibility(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
  });
}
