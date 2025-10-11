// src/client/modules/tally.ts

/**
 * Tally
 *
 * Handles opening a Tally.so iframe modal with a fancy preloader,
 * accessibility focus trapping, and robust fallbacks.
 *
 * Emits structured events and logs for observability.
 *
 * @author <cabal@digerati.design>
 */
import { eventBus } from '$digerati/events';
import {
  autoGroup,
  devError,
  error as logError,
  log,
  time,
  timeEnd,
  warn,
} from '$digerati/utils/logger';

import { normalizeHexColor } from '../utils/color';

const SELECTORS = {
  modal: '[dd-tally="modal"]',
  close: '[dd-tally="close"]',
  iframe: '[dd-tally="iframe"]',
  preloader: '[dd-tally="preloader"]',
  trigger: '[dd-tally="open"]',
};

interface TallyHandles {
  openModal: (url: string) => void;
  closeModal: () => void;
}

export const tally = (minPreloaderMs: number = 1500): TallyHandles => {
  let handles: TallyHandles = {
    openModal: (_: string) => {},
    closeModal: () => {},
  };

  autoGroup('Tally Init', () => {
    const modal = document.querySelector<HTMLElement>(SELECTORS.modal);
    const closeBtn = document.querySelector<HTMLElement>(SELECTORS.close);
    const iframe = document.querySelector<HTMLIFrameElement>(SELECTORS.iframe);
    const preloader = document.querySelector<HTMLElement>(SELECTORS.preloader);

    if (!modal || !closeBtn || !iframe || !preloader) {
      logError('Missing required DOM elements; aborting tally initialization.');
      eventBus.emit('tally:init:error', { reason: 'missing-dom-elements' });
      return;
    }

    // State
    let previousActiveElement: Element | null = null;
    let overallFallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeOutInProgress = false;
    let loadHandled = false;
    let preloaderShownAt = 0;
    let useDarkPreloaderThisOpen = false;
    let currentAccentHex: string | null = null;
    let accentLockActive = false;

    const applyAccentToPreloader = () => {
      const props = ['--front', '--accent', '--disc-front'];
      if (currentAccentHex) {
        props.forEach((prop) => {
          preloader.style.setProperty(prop, currentAccentHex);
        });
      } else {
        props.forEach((prop) => {
          preloader.style.removeProperty(prop);
        });
      }
    };

    const setAccentHex = (value: string | null) => {
      currentAccentHex = value;
      if (value) {
        log('Tally preloader accent set', value);
      } else {
        log('Tally preloader accent cleared');
      }
      applyAccentToPreloader();
    };

    // Preloader grid logic
    const N = 11;
    const modes: Record<string, (r: number, c: number) => number> = {
      topRight: (r, c) => Math.hypot(r, N - 1 - c),
      topLeft: (r, c) => Math.hypot(r, c),
      bottomLeft: (r, c) => Math.hypot(N - 1 - r, c),
      bottomRight: (r, c) => Math.hypot(r, N - 1 - c),
      vertical: (r) => r,
      horizontal: (_, c) => c,
      spiral: (r, c) => ((r + c) % N) + Math.floor((r + c) / N) * N,
      random: () => Math.random() * N * N,
    };
    const modeNames = Object.keys(modes);
    const pickRandomMode = () => modeNames[Math.floor(Math.random() * modeNames.length)];

    const buildGrid = (container: HTMLElement, mode: string) => {
      container.innerHTML = '';
      container.style.display = '';
      container.style.opacity = '1';
      container.style.transition = '';
      const grid = document.createElement('div');
      grid.className = 'grid';
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          const fn = modes[mode];
          const computed = typeof fn === 'function' ? fn(r, c) : 0;
          const d = computed.toFixed(3);
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.style.setProperty('--d', d);
          grid.appendChild(cell);
        }
      }
      container.appendChild(grid);
    };

    const showPreloader = () => {
      autoGroup('Show Preloader', () => {
        fadeOutInProgress = false;
        loadHandled = false;
        if (overallFallbackTimer) {
          clearTimeout(overallFallbackTimer);
          overallFallbackTimer = null;
        }

        preloader.style.display = '';
        preloader.style.opacity = '1';
        preloader.style.transition = '';
        preloaderShownAt = performance.now();

        if (useDarkPreloaderThisOpen) {
          preloader.classList.add('dark-mode');
        } else {
          preloader.classList.remove('dark-mode');
        }

        const mode = pickRandomMode();
        log('Building preloader grid with mode:', mode);
        time('preloader:build');
        buildGrid(preloader, mode);
        timeEnd('preloader:build');

        // reset per-open override
        useDarkPreloaderThisOpen = false;

        applyAccentToPreloader();

        eventBus.emit('tally:preloader:show', { mode });
      });
    };

    const hidePreloaderImmediate = () => {
      autoGroup('Hide Preloader Immediate', () => {
        preloader.innerHTML = '';
        preloader.style.transition = '';
        preloader.style.opacity = '';
        preloader.style.display = 'none';
        fadeOutInProgress = false;
        preloader.classList.remove('dark-mode');
        if (overallFallbackTimer) {
          clearTimeout(overallFallbackTimer);
          overallFallbackTimer = null;
        }
        eventBus.emit('tally:preloader:hide', { method: 'immediate' });
      });
    };

    const hidePreloaderWithJSFade = () => {
      autoGroup('Hide Preloader Fade', () => {
        if (fadeOutInProgress) return;
        fadeOutInProgress = true;

        preloader.style.display = '';
        preloader.style.opacity = '1';
        preloader.style.transition = 'opacity .4s ease';

        requestAnimationFrame(() => {
          preloader.style.opacity = '0';
        });

        let localFallback: ReturnType<typeof setTimeout> | null = null;

        const cleanup = () => {
          if (localFallback) clearTimeout(localFallback);
          preloader.style.transition = '';
          preloader.style.opacity = '';
          preloader.style.display = 'none';
          preloader.innerHTML = '';
          fadeOutInProgress = false;
          preloader.classList.remove('dark-mode');
          if (overallFallbackTimer) {
            clearTimeout(overallFallbackTimer);
            overallFallbackTimer = null;
          }
        };

        const onTransitionEnd = (e: TransitionEvent) => {
          if (e.propertyName === 'opacity') {
            preloader.removeEventListener('transitionend', onTransitionEnd as any);
            cleanup();
            eventBus.emit('tally:preloader:hide', { method: 'fade' });
          }
        };
        preloader.addEventListener('transitionend', onTransitionEnd as any);

        localFallback = window.setTimeout(() => {
          preloader.removeEventListener('transitionend', onTransitionEnd as any);
          cleanup();
          eventBus.emit('tally:preloader:hide', { method: 'fade-fallback' });
        }, 600);
      });
    };

    const scheduleHideAfterMinDuration = () => {
      const now = performance.now();
      const elapsed = now - preloaderShownAt;
      const remaining = Math.max(0, minPreloaderMs - elapsed);
      if (remaining === 0) {
        hidePreloaderWithJSFade();
      } else {
        setTimeout(() => {
          hidePreloaderWithJSFade();
        }, remaining);
      }
    };

    const trapFocus = (e: KeyboardEvent) => {
      const focusableSelectors =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableEls = Array.from(
        modal.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter((el) => !el.hasAttribute('disabled'));
      if (!focusableEls.length) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else {
        trapFocus(e);
      }
    };

    const openModal = (url: string) => {
      autoGroup('Open Modal', () => {
        eventBus.emit('tally:open', { url });
        showPreloader();

        if (overallFallbackTimer) {
          clearTimeout(overallFallbackTimer);
          overallFallbackTimer = null;
        }

        loadHandled = false;

        const cleanListeners = () => {
          iframe.removeEventListener('load', onLoad);
          iframe.removeEventListener('error', onError);
          if (overallFallbackTimer) {
            clearTimeout(overallFallbackTimer);
            overallFallbackTimer = null;
          }
        };

        const onLoad = () => {
          if (loadHandled) return;
          loadHandled = true;
          scheduleHideAfterMinDuration();
          cleanListeners();
          log('Tally iframe loaded successfully for', url);
          eventBus.emit('tally:load:success', { url });
        };
        const onError = () => {
          if (loadHandled) return;
          loadHandled = true;
          scheduleHideAfterMinDuration();
          cleanListeners();
          logError('Tally iframe failed to load for', url);
          eventBus.emit('tally:load:error', { url });
        };

        iframe.addEventListener('load', onLoad);
        iframe.addEventListener('error', onError);

        overallFallbackTimer = setTimeout(() => {
          if (!loadHandled) {
            loadHandled = true;
            hidePreloaderImmediate();
            eventBus.emit('tally:load:timeout', { url });
          }
          overallFallbackTimer = null;
        }, 5000);

        // --- Safari first-load redirect bug workaround ---
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
          log('🐞 [Safari] Pre-warming embed URL to prevent cached /r/ redirect:', url);
          fetch(url, { mode: 'no-cors', cache: 'reload' })
            .then(() => {
              log('✅ [Safari] Pre-warm fetch completed for', url);
            })
            .catch((err) => {
              warn('⚠️ [Safari] Pre-warm fetch failed:', err);
            });
        }
        // --- end Safari patch ---

        iframe.src = url;

        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
        modal.setAttribute('aria-hidden', 'false');
        previousActiveElement = document.activeElement;
        setTimeout(() => {
          closeBtn.focus();
        }, 50);
        document.addEventListener('keydown', handleKeyDown);
        eventBus.emit('tally:opened', { url });
      });
    };

    const closeModal = () => {
      autoGroup('Close Modal', () => {
        eventBus.emit('tally:close');
        log('Closing tally modal');
        modal.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        modal.setAttribute('aria-hidden', 'true');
        iframe.src = '';
        if (previousActiveElement && (previousActiveElement as HTMLElement).focus) {
          (previousActiveElement as HTMLElement).focus();
        }
        if (overallFallbackTimer) {
          clearTimeout(overallFallbackTimer);
          overallFallbackTimer = null;
        }
        hidePreloaderImmediate();
        document.removeEventListener('keydown', handleKeyDown);
        eventBus.emit('tally:closed');
        if (accentLockActive) {
          log('Tally accent lock released on close');
          eventBus.emit('tally:accent:release');
          accentLockActive = false;
        }
        setAccentHex(null);
      });
    };

    const onBodyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLElement>(SELECTORS.trigger);
      if (!link) return;
      e.preventDefault();
      const href = (link as HTMLAnchorElement).getAttribute('href') || '';
      const accentAttr = link.getAttribute('dd-tally-accent');
      const accentHex = normalizeHexColor(accentAttr);
      if (accentHex) {
        log('Tally accent lock requested from trigger', { raw: accentAttr, normalized: accentHex });
        setAccentHex(accentHex);
        eventBus.emit('tally:accent:lock', { hex: accentHex });
        accentLockActive = true;
      } else {
        if (accentAttr) {
          warn('Tally accent lock discarded due to invalid hex', accentAttr);
        }
        setAccentHex(null);
      }
      if (href) openModal(href);
    };

    document.body.addEventListener('click', onBodyClick, true);
    closeBtn.addEventListener('click', closeModal);

    // auto-open if ?formId=... present and use dark variant for that first open
    const params = new URLSearchParams(window.location.search);
    const formId = params.get('formId');
    if (formId) {
      const url = `https://tally.so/embed/${encodeURIComponent(formId)}`;
      log('FormId detected, auto-opening:', formId);
      useDarkPreloaderThisOpen = true;
      openModal(url);
    }

    handles = { openModal, closeModal };
    eventBus.emit('tally:initialized');
  });

  return handles;
};
