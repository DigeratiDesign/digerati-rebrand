// src/digerati/utils/logger.ts

import autoConsoleGroup from 'auto-console-group';

import { shouldLog } from '$digerati/utils/env';

/**
 * Structured logger for Digerati projects.
 * - Verbose when `shouldLog()` is true (localhost / webflow.io / dev env)
 * - Silent for non-critical logs in production
 * - Critical errors always surface
 */
const DEBUG = shouldLog();

/**
 * Wrap console with auto-grouping. We keep it loose because the lib augments console
 * and the shape can vary across environments.
 */
const digeratiConsole = autoConsoleGroup({
  collapsed: true,
  console,
}) as Console & Record<string, unknown>;

type ConsoleMethod =
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'debug'
  | 'trace'
  | 'table'
  | 'group'
  | 'groupCollapsed'
  | 'groupEnd'
  | 'time'
  | 'timeEnd';

/**
 * Internal helper to prefix and call console method safely.
 */
const callConsole = (
  method: ConsoleMethod,
  alwaysShow: boolean,
  prefix: string,
  ...args: unknown[]
): void => {
  if (!alwaysShow && !DEBUG) return;

  const targetMethod = digeratiConsole?.[method];
  const fallbackMethod = console[method] as unknown as ((...a: unknown[]) => void) | undefined;

  const fn =
    typeof targetMethod === 'function'
      ? (targetMethod as (...a: unknown[]) => void)
      : typeof fallbackMethod === 'function'
        ? fallbackMethod
        : undefined;

  if (!fn) return;

  const receiver = fn === targetMethod ? digeratiConsole : console;
  const prefixed = prefix ? `[Digerati]${prefix}` : '[Digerati]';
  fn.call(receiver, prefixed, ...args);
};

// --- Public logging API ------------------------------------------------------

export const log = (...args: unknown[]) => callConsole('log', false, '', ...args);
export const info = (...args: unknown[]) => callConsole('info', false, '', ...args);
export const warn = (...args: unknown[]) => callConsole('warn', false, '', ...args);

/**
 * Non-fatal errors only in dev/staging.
 */
export const devError = (...args: unknown[]) => callConsole('error', false, ' [Dev]', ...args);

/**
 * Critical errors always shown.
 */
export const error = (...args: unknown[]) => callConsole('error', true, '', ...args);

export const debug = (...args: unknown[]) => callConsole('debug', false, '', ...args);

export const trace = (...args: unknown[]) => {
  if (!DEBUG) return;
  if (typeof console.trace === 'function') {
    callConsole('trace', false, '', ...args);
  }
};

export const table = (data: unknown) => {
  if (!DEBUG) return;

  const open = (digeratiConsole.groupCollapsed ??
    digeratiConsole.group ??
    console.groupCollapsed ??
    console.group) as (label: string) => void | undefined;
  const close = (digeratiConsole.groupEnd ?? console.groupEnd) as (() => void) | undefined;
  const showTable = (digeratiConsole.table ?? console.table) as ((d: unknown) => void) | undefined;

  if (open && close && showTable) {
    open('[Digerati] Table');
    try {
      showTable(data);
    } finally {
      close();
    }
    return;
  }

  showTable?.(data);
};

export const group = (label: string) => {
  if (!DEBUG) return;
  const open = (digeratiConsole.groupCollapsed ??
    digeratiConsole.group ??
    console.groupCollapsed ??
    console.group) as (l: string) => void | undefined;
  open?.(`[Digerati] ${label}`);
};

export const groupEnd = () => {
  if (!DEBUG) return;
  const close = (digeratiConsole.groupEnd ?? console.groupEnd) as (() => void) | undefined;
  close?.();
};

export const time = (label: string) => {
  if (!DEBUG) return;
  const timer = (digeratiConsole.time ?? console.time) as ((l: string) => void) | undefined;
  timer?.(`[Digerati] ${label}`);
};

export const timeEnd = (label: string) => {
  if (!DEBUG) return;
  const timerEnd = (digeratiConsole.timeEnd ?? console.timeEnd) as
    | ((l: string) => void)
    | undefined;
  timerEnd?.(`[Digerati] ${label}`);
};

export const assert = (condition: boolean, ...args: unknown[]) => {
  if (!DEBUG) return;
  const assertFn = (digeratiConsole.assert ?? console.assert) as
    | ((cond: boolean, ...a: unknown[]) => void)
    | undefined;
  assertFn?.(condition, '[Digerati]', ...args);
};

/**
 * Wraps a callback in a collapsed group with automatic error handling.
 * Prefers auto-console-group's functional API if available.
 */
export function autoGroup<T>(moduleName: string, callback: () => T): T {
  if (!DEBUG) return callback();

  // Prefer auto-console-group's functional API: group(label, fn)
  const acgGroup = (
    digeratiConsole as unknown as {
      group?: (label: string, fn: () => T) => T;
    }
  ).group;

  if (typeof acgGroup === 'function') {
    return acgGroup(`[Digerati] ${moduleName}`, callback);
  }

  // Fallback to manual open/close with finally
  const open = (digeratiConsole.groupCollapsed ??
    digeratiConsole.group ??
    console.groupCollapsed ??
    console.group) as (l: string) => void | undefined;
  const close = (digeratiConsole.groupEnd ?? console.groupEnd) as (() => void) | undefined;

  if (!open || !close) {
    // Grouping not supported in this environment
    return callback();
  }

  open(`[Digerati] ${moduleName}`);
  try {
    return callback();
  } finally {
    close();
  }
}
