// src/digerati/utils/env.ts

let _overrideHostname: string | null = null;

const getHostname = (): string => {
  if (_overrideHostname !== null) return _overrideHostname;
  if (typeof window !== 'undefined') return window.location.hostname;
  return '';
};

const getProcessEnv = (): { NODE_ENV?: string } | undefined => {
  if (typeof globalThis === 'undefined') return undefined;
  const maybeProcess = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process;
  return maybeProcess?.env;
};

/**
 * For tests or temporary overrides (e.g., simulate staging/production).
 */
export const overrideHostname = (hostname: string | null): void => {
  _overrideHostname = hostname;
};

/**
 * Raw environment detections
 */
export const isWebflowStaging = /\.webflow\.io$/.test(getHostname());
export const isLocalhost = getHostname() === 'localhost' || getHostname() === '127.0.0.1';
export const isDevEnv = getProcessEnv()?.NODE_ENV === 'development';

/**
 * Derived flags
 */
export const isDev = isLocalhost || isWebflowStaging || isDevEnv;
export const isStaging = isWebflowStaging;
export const isProduction = !isDev && !isStaging;

/**
 * Helper for conditional logging or debug behavior.
 */
export const shouldLog = (): boolean => isDev;
