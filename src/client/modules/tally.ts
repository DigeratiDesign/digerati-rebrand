/**
 * Tally
 *
 * Handles opening a Tally.so iframe modal with a fancy preloader,
 * accessibility focus trapping, and robust fallbacks.
 *
 * Emits structured events and logs for observability.
 *
 * Accent lock events still emit for hue control,
 * but preloader visuals remain neutral (no accent applied).
 *
 * Also fades in [dd-tally="dots"] once the favicon hue lock is reached,
 * and resets opacity when released.
 *
 * Includes verbose logging for debugging hue event flow.
 *
 * @author <cabal@digerati.design>
 */
import { eventBus } from '$digerati/events';
import {
  autoGroup,
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
  dots: '[dd-tally="dots"]',
};

interface TallyHandles {
  openModal: (url: string) => void;
  closeModal: () => void;
}

export const tally = (minPreloaderMs: number = 1500): TallyHandles => {
  let handles: TallyHandles = {
    openModal: (_: string) => { },
    closeModal: () => { },
  };

  autoGroup('Tally Init', () => {
    const modal = document.querySelector<HTMLElement>(SELECTORS.modal);
    const closeBtn = document.querySelector<HTMLElement>(SELECTORS.close);
    const iframe = document.querySelector<HTMLIFrameElement>(SELECTORS.iframe);
    const preloader = document.querySelector<HTMLElement>(SELECTORS.preloader);
    const dots = document.querySelector<HTMLElement>(SELECTORS.dots);

    console.log('[Tally] Registering faviconHueRotateStepped event listeners');
    eventBus.on('faviconHueRotateStepped:locked', ({ hue }) => {
      console.log('[Tally] received faviconHueRotateStepped:locked', { hue });
      if (dots) dots.style.opacity = '1';
    });

    eventBus.on('faviconHueRotateStepped:released', () => {
      console.log('[Tally] received faviconHueRotateStepped:released');
      if (dots) dots.style.opacity = '0';
    });

    log('Tally found elements', {
      modal: !!modal,
      closeBtn: !!closeBtn,
      iframe: !!iframe,
      preloader: !!preloader,
      dots: !!dots,
    });

    if (!modal || !closeBtn || !iframe || !preloader) {
      logError('Missing required DOM elements; aborting tally initialization.');
      eventBus.emit('tally:init:error', { reason: 'missing-dom-elements' });
      return;
    }

    // --- STATE ---
    let previousActiveElement: Element | null = null;
    let overallFallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeOutInProgress = false;
    let loadHandled = false;
    let preloaderShownAt = 0;
    let useDarkPreloaderThisOpen = false;
    let accentLockActive = false;

    // --- PRELOADER GRID LOGIC ---
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

        useDarkPreloaderThisOpen = false;

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
        requestAnimationFrame(() => (preloader.style.opacity = '0'));

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
      const elapsed = performance.now() - preloaderShownAt;
      const remaining = Math.max(0, minPreloaderMs - elapsed);
      remaining === 0 ? hidePreloaderWithJSFade() : setTimeout(hidePreloaderWithJSFade, remaining);
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
      if (e.key === 'Escape') closeModal();
      else trapFocus(e);
    };

    const openModal = (url: string) => {
      autoGroup('Open Modal', () => {
        eventBus.emit('tally:open', { url });
        showPreloader();
        if (overallFallbackTimer) clearTimeout(overallFallbackTimer);
        loadHandled = false;

        const cleanListeners = () => {
          iframe.removeEventListener('load', onLoad);
          iframe.removeEventListener('error', onError);
          if (overallFallbackTimer) clearTimeout(overallFallbackTimer);
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
        }, 5000);

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
          log('🐞 [Safari] Pre-warming embed URL to prevent cached /r/ redirect:', url);
          fetch(url, { mode: 'no-cors', cache: 'reload' })
            .then(() => log('✅ [Safari] Pre-warm fetch completed for', url))
            .catch((err) => warn('⚠️ [Safari] Pre-warm fetch failed:', err));
        }

        iframe.src = url;
        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
        modal.setAttribute('aria-hidden', 'false');
        previousActiveElement = document.activeElement;
        setTimeout(() => closeBtn.focus(), 50);
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
        if (previousActiveElement && (previousActiveElement as HTMLElement).focus)
          (previousActiveElement as HTMLElement).focus();
        if (overallFallbackTimer) clearTimeout(overallFallbackTimer);
        hidePreloaderImmediate();
        document.removeEventListener('keydown', handleKeyDown);
        eventBus.emit('tally:closed');
        if (accentLockActive) {
          log('Tally accent lock released on close');
          eventBus.emit('tally:accent:release');
          accentLockActive = false;
        }
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
        eventBus.emit('tally:accent:lock', { hex: accentHex });
        accentLockActive = true;
      } else if (accentAttr) warn('Tally accent lock discarded due to invalid hex', accentAttr);

      if (href) openModal(href);
    };

    document.body.addEventListener('click', onBodyClick, true);
    closeBtn.addEventListener('click', closeModal);

    // --- DOTS fade behaviour ---
    if (dots) {
      log('Tally dots element found; attaching hue event listeners');
      eventBus.on('faviconHueRotateStepped:locked', (data) => {
        log('⚡ faviconHueRotateStepped:locked received', data);
        dots.style.transition = 'opacity 0.4s ease';
        dots.style.opacity = '1';
      });
      eventBus.on('faviconHueRotateStepped:released', () => {
        log('⚡ faviconHueRotateStepped:released received');
        dots.style.transition = '';
        dots.style.opacity = '0';
      });
    } else {
      warn('No [dd-tally="dots"] element found — skipping hue listeners');
    }

    // --- AUTO-OPEN (GET param) ---
    const params = new URLSearchParams(window.location.search);
    const formId = params.get('formId');
    const accentParam = params.get('accent');

    if (formId) {
      const url = `https://tally.so/embed/${encodeURIComponent(formId)}`;
      log('FormId detected, auto-opening:', formId);

      const emitAccentLock = () => {
        if (accentParam) {
          const accentHex = normalizeHexColor(`#${accentParam}`);
          if (accentHex) {
            log('Accent param detected; emitting tally:accent:lock', accentHex);
            eventBus.emit('tally:accent:lock', { hex: accentHex });
            accentLockActive = true;
          } else warn('Invalid accent param:', accentParam);
        }
      };

      let faviconReady = false;
      const offRunning = eventBus.on('faviconHueRotateStepped:running', () => {
        faviconReady = true;
        log('Favicon hue rotate running — lock now');
        emitAccentLock();
        offRunning();
      });

      // Safety timeout
      setTimeout(() => {
        if (!faviconReady) {
          log('Favicon not confirmed ready after delay — emitting anyway');
          emitAccentLock();
          offRunning();
        }
      }, 1200);

      useDarkPreloaderThisOpen = true;
      openModal(url);
    }

    handles = { openModal, closeModal };
    eventBus.emit('tally:initialized');
  });

  return handles;
};
