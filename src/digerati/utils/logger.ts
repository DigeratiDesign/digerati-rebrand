// src/digerati/utils/logger.ts

import { shouldLog } from "$digerati/utils/env";

/**
 * Structured logger for Digerati projects.
 * - Verbose when `shouldLog()` is true (localhost / webflow.io / dev env)
 * - Silent for non-critical logs in production
 * - Critical errors always surface
 */
const DEBUG = shouldLog();

/**
 * Internal helper to prefix and call console method safely.
 */
const callConsole = (
    method: keyof Console,
    alwaysShow: boolean,
    prefix: string,
    ...args: any[]
) => {
    const fn = (console as any)[method];
    if (!fn) return;

    if (alwaysShow || DEBUG) {
        fn.call(console, `[Digerati]${prefix}`, ...args);
    }
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
    if (DEBUG && console.table) {
        if (console.groupCollapsed) {
            console.groupCollapsed("[Digerati] Table");
        }
        console.table(data);
        if (console.groupEnd) {
            console.groupEnd();
        }
    }
};

export const group = (label: string) => {
    if (DEBUG && console.groupCollapsed) {
        console.groupCollapsed(`[Digerati] ${label}`);
    }
};

export const groupEnd = () => {
    if (DEBUG && console.groupEnd) {
        console.groupEnd();
    }
};

export const trace = (...args: any[]) => {
    if (DEBUG && typeof console.trace === "function") {
        callConsole("trace", false, "", ...args);
    }
};

export const time = (label: string) => {
    if (DEBUG && console.time) {
        console.time(`[Digerati] ${label}`);
    }
};

export const timeEnd = (label: string) => {
    if (DEBUG && console.timeEnd) {
        console.timeEnd(`[Digerati] ${label}`);
    }
};

export const assert = (condition: boolean, ...args: any[]) => {
    if (DEBUG && console.assert) {
        console.assert(condition, "[Digerati]", ...args);
    }
};

/**
 * Wraps a callback in a collapsed group with automatic error handling.
 * @param moduleName Descriptive name for the group
 * @param callback Function to run inside the group
 */
// utils/logger.ts
export function autoGroup<T>(moduleName: string, callback: () => T): T {
    if (!DEBUG || !console.groupCollapsed || !console.groupEnd) {
        return callback();
    }

    console.groupCollapsed(`[Digerati] ${moduleName}`);
    try {
        return callback();
    } finally {
        console.groupEnd();
    }
}
