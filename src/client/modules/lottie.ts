// src/client/modules/lottie.ts
import lottie from 'lottie-web';
import { eventBus } from '$digerati/events';
import { log } from '$digerati/utils/logger';

type Animation = ReturnType<typeof lottie.loadAnimation>;
type State =
  | 'uninitialized'
  | 'initializing'
  | 'playing'
  | 'paused'
  | 'pending-destruction'
  | 'destroyed';
interface ContainerState {
  element: HTMLElement;
  animation: Animation | null;
  state: State;
  visible: boolean;
  generation: number;
  eligibleGeneration: number;
  frame: number | null;
  destroyTimer: ReturnType<typeof setTimeout> | null;
  removeCallbacks: (() => void) | null;
}

let cleanupLottie: (() => void) | undefined;

export function lottieInit(): () => void {
  if (cleanupLottie) return cleanupLottie;
  const containers = document.querySelectorAll<HTMLElement>('[dd-lottie]');
  const renderIOSAsCanvas = true;
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  let disposed = false;
  let pageHidden = document.hidden;
  let activeIOS: ContainerState | null = null;
  let iosPlaybackRequest: ContainerState | null = null;
  const desktopPlayers: ContainerState[] = [];
  const desktopToPause = new Set<ContainerState>();
  const records: ContainerState[] = Array.from(containers, (element) => ({
    element,
    animation: null,
    state: 'uninitialized',
    visible: false,
    generation: 0,
    eligibleGeneration: -1,
    frame: null,
    destroyTimer: null,
    removeCallbacks: null,
  }));
  const observers: IntersectionObserver[] = [];

  eventBus.emit('lottie:init', { count: containers.length });
  log(`[Lottie] Found ${containers.length} elements`);

  const clearDestroyTimer = (record: ContainerState) => {
    if (record.destroyTimer !== null) clearTimeout(record.destroyTimer);
    record.destroyTimer = null;
  };
  const invalidate = (record: ContainerState) => {
    record.generation++;
    record.eligibleGeneration = -1;
    if (record.frame !== null) cancelAnimationFrame(record.frame);
    record.frame = null;
  };
  const releaseOwnership = (record: ContainerState) => {
    if (activeIOS === record) activeIOS = null;
    if (iosPlaybackRequest === record) iosPlaybackRequest = null;
    const index = desktopPlayers.indexOf(record);
    if (index >= 0) desktopPlayers.splice(index, 1);
    desktopToPause.delete(record);
  };
  const destroy = (record: ContainerState) => {
    invalidate(record);
    clearDestroyTimer(record);
    releaseOwnership(record);
    const animation = record.animation;
    record.animation = null;
    record.state = 'destroyed';
    record.removeCallbacks?.();
    record.removeCallbacks = null;
    if (!animation) return;
    animation.destroy();
    eventBus.emit('lottie:destroyed', { element: record.element });
  };
  const pause = (record: ContainerState) => {
    const animation = record.animation;
    releaseOwnership(record);
    if (!animation) return;
    if (!record.visible || record.state === 'pending-destruction') {
      destroy(record);
      return;
    }
    animation.pause();
    record.state = 'paused';
    eventBus.emit('lottie:paused', { element: record.element });
  };
  const eligible = (record: ContainerState) =>
    !disposed && !pageHidden && record.visible && record.eligibleGeneration === record.generation;

  const play = (record: ContainerState) => {
    const animation = record.animation;
    if (!animation || !animation.isLoaded || !eligible(record)) return;
    if (isIOS && iosPlaybackRequest !== record) {
      record.state = 'paused';
      return;
    }
    clearDestroyTimer(record);
    if (isIOS) {
      // Ownership transfer must pause immediately to guarantee one playing instance.
      if (activeIOS && activeIOS !== record) pause(activeIOS);
      activeIOS = record;
    } else {
      // Preserve desktop's deferred pause at the current loop boundary.
      desktopToPause.delete(record);
      const remainingPlayers = desktopPlayers.filter((player) => !desktopToPause.has(player));
      if (!desktopPlayers.includes(record)) {
        if (remainingPlayers.length >= 2) desktopToPause.add(remainingPlayers[0]);
        desktopPlayers.push(record);
      }
    }
    record.state = 'playing';
    animation.play();
  };

  const initialize = (record: ContainerState) => {
    if (!eligible(record)) return;
    if (record.animation) {
      play(record);
      return;
    }
    const path = record.element.getAttribute('dd-lottie')!;
    const renderer = isIOS && renderIOSAsCanvas ? 'canvas' : 'svg';
    record.state = 'initializing';
    // Claim ownership before playback; autoplay would bypass the concurrency policy.
    const animation = lottie.loadAnimation({
      container: record.element,
      renderer,
      loop: true,
      autoplay: false,
      path,
    });
    record.animation = animation;
    const onReady = () => {
      if (record.animation === animation) play(record);
    };
    const onLoop = () => {
      if (record.animation !== animation) return;
      if (record.state === 'pending-destruction' && !record.visible) destroy(record);
      else if (desktopToPause.has(record)) pause(record);
    };
    const onFailure = () => {
      if (record.animation === animation) destroy(record);
    };
    animation.addEventListener('DOMLoaded', onReady);
    animation.addEventListener('loopComplete', onLoop);
    animation.addEventListener('data_failed', onFailure);
    record.removeCallbacks = () => {
      animation.removeEventListener('DOMLoaded', onReady);
      animation.removeEventListener('loopComplete', onLoop);
      animation.removeEventListener('data_failed', onFailure);
    };
    const createdEvent = { element: record.element, path, renderer };
    eventBus.emit('lottie:created', createdEvent);
    onReady();
  };

  const waitForLayout = (record: ContainerState) => {
    invalidate(record);
    const generation = record.generation;
    if (isIOS) iosPlaybackRequest = record;
    let lastW = 0,
      lastH = 0,
      stable = 0;
    if (!record.animation) record.state = 'initializing';
    const check = () => {
      // Also guard already-queued callbacks whose cancellation was too late.
      if (disposed || pageHidden || !record.visible || generation !== record.generation) return;
      record.frame = null;
      const { width, height } = record.element.getBoundingClientRect();
      if (width && height && width === lastW && height === lastH) stable++;
      else {
        stable = 0;
        lastW = width;
        lastH = height;
      }
      if (stable >= 2) {
        record.eligibleGeneration = generation;
        initialize(record);
      } else record.frame = requestAnimationFrame(check);
    };
    record.frame = requestAnimationFrame(check);
  };

  const leave = (record: ContainerState) => {
    invalidate(record);
    const animation = record.animation;
    if (!animation) {
      record.state = 'uninitialized';
      return;
    }
    if (pageHidden || animation.isPaused || record.state !== 'playing') {
      destroy(record);
      return;
    }
    record.state = 'pending-destruction';
    const generation = record.generation;
    // Normally loopComplete destroys it. Bound retention if loading/playback stalls.
    const remainingSeconds =
      (animation.totalFrames - animation.currentFrame) /
      (animation.frameRate * Math.abs(animation.playSpeed));
    const delay = Number.isFinite(remainingSeconds)
      ? Math.max(0, remainingSeconds * 1000) + 100
      : 100;
    record.destroyTimer = setTimeout(() => {
      if (record.generation !== generation) return;
      record.destroyTimer = null;
      if (record.animation === animation && !record.visible) destroy(record);
    }, delay);
  };

  records.forEach((record) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (disposed) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting === record.visible) return;
          record.visible = entry.isIntersecting;
          if (record.visible) {
            eventBus.emit('lottie:entered', { element: record.element });
            clearDestroyTimer(record);
            if (record.animation) record.state = record.animation.isPaused ? 'paused' : 'playing';
            if (!pageHidden) waitForLayout(record);
          } else {
            eventBus.emit('lottie:exited', { element: record.element });
            leave(record);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(record.element);
    observers.push(observer);
  });

  const onVisibility = () => {
    pageHidden = document.hidden;
    records.forEach((record) => {
      if (pageHidden) {
        invalidate(record);
        pause(record);
      } else if (record.visible) waitForLayout(record);
    });
  };
  const onPageHide = (event: PageTransitionEvent) => {
    if (!event.persisted) {
      cleanup();
      return;
    }
    pageHidden = true;
    observers.forEach((observer) => observer.disconnect());
    records.forEach((record) => {
      record.visible = false;
      destroy(record);
    });
  };
  const onPageShow = (event: PageTransitionEvent) => {
    if (!event.persisted || disposed) return;
    pageHidden = document.hidden;
    records.forEach((record, index) => observers[index].observe(record.element));
  };
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    observers.forEach((observer) => observer.disconnect());
    records.forEach(destroy);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', onPageHide);
    window.removeEventListener('pageshow', onPageShow);
    cleanupLottie = undefined;
  };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);
  cleanupLottie = cleanup;
  return cleanup;
}
