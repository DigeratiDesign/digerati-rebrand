// src/digerati/utils/logger.ts

import autoConsoleGroup from "auto-console-group";

import { shouldLog } from "$digerati/utils/env";

/**
 * Structured logger for Digerati projects.
 * - Verbose when `shouldLog()` is true (localhost / webflow.io / dev env)
 * - Silent for non-critical logs in production
 * - Critical errors always surface
 */
const DEBUG = shouldLog();

const digeratiConsole = autoConsoleGroup({
    collapsed: true,
    console,
});

/**
 * Internal helper to prefix and call console method safely.
 */
const callConsole = (
    method: keyof Console,
    alwaysShow: boolean,
    prefix: string,
    ...args: any[]
) => {
    if (!alwaysShow && !DEBUG) {
        return;
    }

    const target = digeratiConsole as Console & Record<string, unknown>;
    const targetMethod = target?.[method];
    const fallbackMethod = (console as any)[method] as ((...args: any[]) => void) | undefined;

    const fn = typeof targetMethod === "function"
        ? (targetMethod as (...args: any[]) => void)
        : typeof fallbackMethod === "function"
          ? fallbackMethod
          : undefined;

    if (!fn) {
        return;
    }

    const receiver = fn === targetMethod ? target : console;
    fn.call(receiver, `[Digerati]${prefix}`, ...args);
};

export const log = (...args: any[]) => {
    callConsole("log", false, "", ...args);
};

export const info = (...args: any[]) => {
    callConsole("info", false, "", ...args);
};

export const warn = (...args: any[]) => {
    callConsole("warn", false, "", ...args);
};

/**
 * Non-fatal errors only in dev/staging.
 */
export const devError = (...args: any[]) => {
    callConsole("error", false, "[Dev]", ...args);
};

/**
 * Critical errors always shown.
 */
export const error = (...args: any[]) => {
    callConsole("error", true, "", ...args);
};

export const debug = (...args: any[]) => {
    callConsole("debug", false, "", ...args);
};

export const table = (data: any) => {
    if (!DEBUG) {
        return;
    }

    const open = (digeratiConsole.groupCollapsed ?? digeratiConsole.group)?.bind(digeratiConsole);
    const close = digeratiConsole.groupEnd?.bind(digeratiConsole);
    const showTable = (digeratiConsole.table ?? console.table)?.bind(digeratiConsole);

    if (open && close && showTable) {
        open("[Digerati] Table");
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
    if (!DEBUG) {
        return;
    }

    const open = (digeratiConsole.groupCollapsed ?? digeratiConsole.group)?.bind(digeratiConsole);
    open?.(`[Digerati] ${label}`);
};

export const groupEnd = () => {
    if (!DEBUG) {
        return;
    }

    digeratiConsole.groupEnd?.call(digeratiConsole);
};

export const trace = (...args: any[]) => {
    callConsole("trace", false, "", ...args);
};

export const time = (label: string) => {
    if (!DEBUG) {
        return;
    }

    const timer = digeratiConsole.time ?? console.time;
    timer?.call(digeratiConsole, `[Digerati] ${label}`);
};

export const timeEnd = (label: string) => {
    if (!DEBUG) {
        return;
    }

    const timerEnd = digeratiConsole.timeEnd ?? console.timeEnd;
    timerEnd?.call(digeratiConsole, `[Digerati] ${label}`);
};

export const assert = (condition: boolean, ...args: any[]) => {
    if (!DEBUG) {
        return;
    }

    const assertFn = digeratiConsole.assert ?? console.assert;
    assertFn?.call(digeratiConsole, condition, "[Digerati]", ...args);
};

/**
 * Wraps a callback in a collapsed group with automatic error handling.
 * @param moduleName Descriptive name for the group
 * @param callback Function to run inside the group
 */
// utils/logger.ts
export function autoGroup<T>(moduleName: string, callback: () => T): T {
    if (!DEBUG) {
        return callback();
    }

    const runner = digeratiConsole.group as unknown;

    if (typeof runner === "function") {
        return (runner as (label: string, fn: () => T) => T)(`[Digerati] ${moduleName}`, callback);
    }

    const open = (digeratiConsole.groupCollapsed ?? digeratiConsole.group)?.bind(digeratiConsole);
    const close = digeratiConsole.groupEnd?.bind(digeratiConsole);

    if (open && close) {
        open(`[Digerati] ${moduleName}`);
        try {
            return callback();
        } finally {
            close();
        }
    }

    return callback();
}
