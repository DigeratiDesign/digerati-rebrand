/**
 * Favicon Hue Rotate (Stepped)
 * Cycles the site favicon through discrete hue-rotated frames while syncing
 * a continuous CSS --h variable for page hue animations.
 *
 * Skips devices/contexts where favicons are not visible or wasteful
 * (iOS Safari, PWAs/standalone, iframes, reduced motion). Pauses when
 * the tab is hidden.
 *
 * @author <cabal@digerati.design>
 */

import { eventBus } from '$digerati/events';
import { autoGroup, devError, log } from '$digerati/utils/logger';

import { hexToHue, hueDistance, normalizeHexColor, normalizeHue } from '../utils/color';

// Tune step cadence via interval rather than arbitrary step count
const DURATION = 12000; // ms for full cycle
const STEP_INTERVAL_MS = 500; // e.g., 500=2Hz, 1000=1Hz
const STEPS = Math.max(8, Math.round(DURATION / STEP_INTERVAL_MS)); // derived steps
const SIZE32 = 32;
const SIZE16 = 16;

const MAX_FPS = 60; // CSS update cadence (page smoothness)
const HUE_MATCH_TOLERANCE_DEG = 1.5;

interface FreezeTarget {
  hue: number;
  phase: number;
  step: number;
}

const hueToPhase = (hue: number): number => normalizeHue(hue) / 360;

const hueToStep = (hue: number): number => {
  const phase = hueToPhase(hue);
  const raw = Math.round(phase * STEPS);
  return raw % STEPS;
};

export const faviconHueRotateStepped = (): void => {
  autoGroup('Favicon Hue Rotate (Stepped)', () => {
    const gate = shouldAnimateFavicon();
    if (!gate.ok) {
      log(`Favicon hue rotation skipped: ${gate.reason ?? 'unknown'}`);
      eventBus.emit('faviconHueRotateStepped:skipped', { reason: gate.reason });
      return;
    }

    eventBus.emit('faviconHueRotateStepped:started');

    const baseHref = findBaseHref();
    if (!baseHref) {
      devError('No base favicon found.');
      return;
    }

    // Canvas setup
    const c32 = document.createElement('canvas');
    const ctx32 = c32.getContext('2d');
    if (!ctx32 || typeof c32.toDataURL !== 'function') return;
    try {
      (ctx32 as any).filter = 'hue-rotate(0deg)';
    } catch {}
    if (!('filter' in (ctx32 as any))) return;

    const c16 = document.createElement('canvas');
    const ctx16 = c16.getContext('2d')!;
    c32.width = SIZE32;
    c32.height = SIZE32;
    c16.width = SIZE16;
    c16.height = SIZE16;

    // Remove existing favicons
    Array.from(document.querySelectorAll("link[rel*='icon']")).forEach((n) => n.remove());
    let link32 = makeLink('live-favicon-32', `${SIZE32}x${SIZE32}`);
    let link16 = makeLink('live-favicon-16', `${SIZE16}x${SIZE16}`);

    let lockHandler: ((hex: string) => void) | null = null;
    let releaseHandler: (() => void) | null = null;
    let queuedLockHex: string | null = null;
    let releaseQueued = false;

    const handleLockEvent = ({ hex }: { hex: string }) => {
      const normalized = normalizeHexColor(hex);
      if (!normalized) {
        log('Favicon hue lock received invalid hex', hex);
        return;
      }
      log('Favicon hue lock requested', { raw: hex, normalized });
      if (lockHandler) {
        log('Favicon hue lock applying immediately', normalized);
        lockHandler(normalized);
      } else {
        log('Favicon hue lock queued', normalized);
        queuedLockHex = normalized;
        releaseQueued = false;
      }
    };

    const handleReleaseEvent = () => {
      if (releaseHandler) {
        log('Favicon hue release applying immediately');
        releaseHandler();
      } else {
        log('Favicon hue release queued');
        queuedLockHex = null;
        releaseQueued = true;
      }
    };

    const removeLockListener = eventBus.on('tally:accent:lock', handleLockEvent);
    const removeReleaseListener = eventBus.on('tally:accent:release', handleReleaseEvent);
    const teardownListeners = () => {
      removeLockListener();
      removeReleaseListener();
    };

    // Load base image and precompute hue-rotated frames
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const frames32: string[] = [];
      const frames16: string[] = [];

      for (let i = 0; i < STEPS; i++) {
        const angle = Math.round(i * (360 / STEPS));

        // 32×32 frame
        ctx32.clearRect(0, 0, SIZE32, SIZE32);
        (ctx32 as any).imageSmoothingEnabled = false;
        (ctx32 as any).filter = `hue-rotate(${angle}deg)`;
        ctx32.drawImage(img, 0, 0, SIZE32, SIZE32);
        (ctx32 as any).filter = 'none';
        frames32[i] = c32.toDataURL('image/png');

        // 16×16 frame
        ctx16.clearRect(0, 0, SIZE16, SIZE16);
        (ctx16 as any).imageSmoothingEnabled = false;
        (ctx16 as any).filter = `hue-rotate(${angle}deg)`;
        ctx16.drawImage(img, 0, 0, SIZE16, SIZE16);
        (ctx16 as any).filter = 'none';
        frames16[i] = c16.toDataURL('image/png');
      }

      log(`Precomputed ${STEPS} favicon frames`);

      const swapFavicons = (data32: string, data16: string) => {
        const n32 = makeLink('live-favicon-32', `${SIZE32}x${SIZE32}`);
        n32.href = data32;
        link32.remove();
        link32 = n32;

        const n16 = makeLink('live-favicon-16', `${SIZE16}x${SIZE16}`);
        n16.href = data16;
        link16.remove();
        link16 = n16;
      };

      let rafId: number | null = null;
      let lastCssWriteAt = 0;
      let lastStep = -1;
      let origin = performance.now();
      let freezeTarget: FreezeTarget | null = null;
      let pausedAt: number | null = null;

      const setCssHue = (angle: number) => {
        document.documentElement.style.setProperty('--h', `${Math.round(angle)}deg`);
      };

      const applyStep = (index: number) => {
        swapFavicons(frames32[index], frames16[index]);
        lastStep = index;
      };

      const computePhase = (now: number) => {
        const elapsed = now - origin;
        const wrapped = ((elapsed % DURATION) + DURATION) % DURATION;
        return wrapped / DURATION;
      };

      const freezeAt = (now: number, target: FreezeTarget) => {
        const { phase, hue, step } = target;
        log('Favicon hue rotation freeze reached', { hue, phase, step });
        origin = now - phase * DURATION;
        pausedAt = now;
        document.documentElement.style.setProperty('--h', `${hue}deg`);
        applyStep(step);
        lastCssWriteAt = now;
        stop();
      };

      const tick = (now: number) => {
        const cssMinDelta = 1000 / MAX_FPS;
        const phase = computePhase(now);
        const angle = phase * 360;

        if (now - lastCssWriteAt >= cssMinDelta) {
          setCssHue(angle);
          lastCssWriteAt = now;
        }

        const stepIndex = Math.floor(phase * STEPS) % STEPS;
        if (stepIndex !== lastStep) {
          applyStep(stepIndex);
        }

        if (freezeTarget) {
          const delta = hueDistance(angle, freezeTarget.hue);
          if (delta <= HUE_MATCH_TOLERANCE_DEG || stepIndex === freezeTarget.step) {
            freezeAt(now, freezeTarget);
            freezeTarget = null;
            return;
          }
        }

        rafId = requestAnimationFrame(tick);
      };

      const start = () => {
        if (!rafId) {
          rafId = requestAnimationFrame(tick);
        }
      };

      const stop = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      };

      const resumeFromPause = () => {
        if (pausedAt != null) {
          const now = performance.now();
          origin += now - pausedAt;
          pausedAt = null;
        }
      };

      const lockToHex = (hex: string) => {
        const normalized = normalizeHexColor(hex);
        if (!normalized) return;
        const hue = hexToHue(normalized);
        if (hue === null) {
          log('Favicon hue lock failed to compute hue', normalized);
          return;
        }
        resumeFromPause();
        const adjustedHue = normalizeHue(hue);
        log('Favicon hue rotation locking', { normalized, hue: adjustedHue });
        freezeTarget = {
          hue: adjustedHue,
          phase: hueToPhase(adjustedHue),
          step: hueToStep(adjustedHue),
        };
        start();
      };

      const release = () => {
        log('Favicon hue rotation released');
        freezeTarget = null;
        resumeFromPause();
        start();
      };

      lockHandler = lockToHex;
      releaseHandler = release;

      if (queuedLockHex) {
        log('Favicon hue rotation processing queued lock', queuedLockHex);
        lockToHex(queuedLockHex);
        queuedLockHex = null;
      }
      if (releaseQueued) {
        log('Favicon hue rotation processing queued release');
        release();
        releaseQueued = false;
      }

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          stop();
        } else if (!freezeTarget && pausedAt === null) {
          start();
        }
      });

      addEventListener(
        'pagehide',
        () => {
          stop();
          teardownListeners();
        },
        { once: true }
      );

      start();
      eventBus.emit('faviconHueRotateStepped:running');
    };

    img.onerror = () => {
      devError('Failed to load base favicon.');
      teardownListeners();
    };
    img.src = baseHref;
  });
};

// ----------------- helpers -----------------

const shouldAnimateFavicon = (): { ok: boolean; reason?: string } => {
  // Respect OS motion prefs
  if (matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
    return { ok: false, reason: 'reduced-motion' };
  }

  // Skip if we're embedded
  if (window.top !== window.self) {
    return { ok: false, reason: 'in-iframe' };
  }

  // Skip standalone/PWA
  const isStandalone =
    matchMedia?.('(display-mode: standalone)')?.matches ||
    // iOS PWA flag
    (navigator as any).standalone === true;
  if (isStandalone) {
    return { ok: false, reason: 'standalone' };
  }

  // iOS Safari heuristic (no CriOS/FxiOS)
  const ua = navigator.userAgent;
  const isIOS = /iP(hone|ad|od)/.test(ua);
  const isCriOS = /CriOS/i.test(ua);
  const isFxiOS = /FxiOS/i.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isIOSSafari = isIOS && isSafari && !isCriOS && !isFxiOS;
  if (isIOSSafari) {
    return { ok: false, reason: 'ios-safari' };
  }

  return { ok: true };
};

const findBaseHref = (): string | null => {
  const links = Array.from(document.querySelectorAll("link[rel*='icon']")) as HTMLLinkElement[];
  if (!links.length) return null;
  links.sort((a, b) => {
    const ap = /png/i.test(a.type) || /\.png(\?|$)/i.test(a.href) ? 1 : 0;
    const bp = /png/i.test(b.type) || /\.png(\?|$)/i.test(b.href) ? 1 : 0;
    return bp - ap; // PNG first
  });
  return links[0].href || null;
};

const makeLink = (id: string, sizes: string): HTMLLinkElement => {
  const l = document.createElement('link');
  l.id = id;
  l.rel = 'icon';
  l.type = 'image/png';
  l.setAttribute('sizes', sizes);
  document.head.appendChild(l);
  return l;
};
