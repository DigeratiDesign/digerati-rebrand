import { info } from '$digerati/utils/logger';

const PARAMETER = 'dd-debug-disable';
const SYSTEMS = ['lottie', 'colour-cycle', 'halftone', 'all-custom'] as const;
type System = (typeof SYSTEMS)[number];
const allowedHost = ['digerati-rebrand.webflow.io', 'localhost', '127.0.0.1'].includes(
  location.hostname
);
const disabled = new Set<System>(
  allowedHost
    ? new URLSearchParams(location.search)
        .getAll(PARAMETER)
        .flatMap((value) => value.split(','))
        .filter((value): value is System => SYSTEMS.includes(value as System))
    : []
);
let initialized = false;

export const isAnimationDisabled = (system: System): boolean =>
  disabled.has('all-custom') || disabled.has(system);

/** Temporary, opt-in staging controls. Evaluate before allocating animation resources. */
export const initAnimationDiagnostics = (): void => {
  if (initialized || !disabled.size) return;
  initialized = true;
  info('[Animation diagnostics] Disabled:', [...disabled].join(','));

  const style = document.createElement('style');
  style.id = 'dd-animation-diagnostics';
  style.textContent = [
    isAnimationDisabled('colour-cycle')
      ? ':root { --h: 0deg !important; animation: none !important; } .colour-cycle { filter: none !important; }'
      : '',
    isAnimationDisabled('halftone')
      ? 'img.testimonial_half-tone { visibility: visible !important; }'
      : '',
    disabled.has('all-custom')
      ? '.grid .cell, .grid .cell::before, .grid .cell::after, .social-proof_logos { animation: none !important; }'
      : '',
  ].join('\n');
  document.head.appendChild(style);

  // Keep a test configuration across internal navigation, without changing external links.
  document.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;
      if (anchor.getAttribute('href')?.startsWith('#')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return;
      url.searchParams.set(PARAMETER, [...disabled].join(','));
      anchor.href = url.href;
    },
    true
  );
};
