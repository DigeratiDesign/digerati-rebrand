export interface AutoConsoleGroupOptions {
  console?: Console;
  collapsed?: boolean;
}

export type AutoGroupedConsole = Console & {
  group<T>(label: string, callback: () => T): T;
  groupCollapsed<T>(label: string, callback: () => T): T;
};

const isFunction = <T extends (...args: any[]) => unknown>(value: unknown): value is T =>
  typeof value === 'function';

const bindConsoleMethod = <K extends keyof Console>(
  target: Console,
  method: K
): ((...args: any[]) => any) | undefined => {
  const fn = target[method];
  if (!isFunction(fn)) {
    return undefined;
  }

  return (...args: any[]) => fn.apply(target, args);
};

const createGroupRunner = (
  opener: ((label?: any, ...data: any[]) => void) | undefined,
  closer: (() => void) | undefined
) => {
  return <T>(label: string, callback: () => T): T => {
    if (!opener || !closer) {
      return callback();
    }

    opener(label);
    try {
      return callback();
    } finally {
      closer();
    }
  };
};

const createWrapper = (
  preferred: 'collapsed' | 'expanded',
  runCollapsed: <T>(label: string, callback: () => T) => T,
  runExpanded: <T>(label: string, callback: () => T) => T,
  fallbackCollapsed: ((label?: any, ...data: any[]) => void) | undefined,
  fallbackExpanded: ((label?: any, ...data: any[]) => void) | undefined
) => {
  return function groupWrapper<T>(label: string, maybeFn?: unknown, ...rest: unknown[]): T | void {
    if (isFunction(maybeFn) && rest.length === 0) {
      const runner = preferred === 'collapsed' ? runCollapsed : runExpanded;
      return runner(label, maybeFn as () => T);
    }

    const fallback = preferred === 'collapsed' ? fallbackCollapsed : fallbackExpanded;
    fallback?.(label, maybeFn as any, ...(rest as any[]));
    return undefined;
  };
};

export default function autoConsoleGroup(
  options: AutoConsoleGroupOptions = {}
): AutoGroupedConsole {
  const target = options.console ?? console;
  const collapsedByDefault = options.collapsed ?? true;

  const openCollapsed =
    bindConsoleMethod(target, 'groupCollapsed') ?? bindConsoleMethod(target, 'group');
  const openExpanded = bindConsoleMethod(target, 'group') ?? openCollapsed;
  const closeGroup = bindConsoleMethod(target, 'groupEnd');

  const fallbackCollapsed =
    bindConsoleMethod(target, 'groupCollapsed') ?? bindConsoleMethod(target, 'group');
  const fallbackExpanded =
    bindConsoleMethod(target, 'group') ?? bindConsoleMethod(target, 'groupCollapsed');

  const runCollapsed = createGroupRunner(openCollapsed, closeGroup);
  const runExpanded = createGroupRunner(openExpanded, closeGroup);

  const proxy = Object.create(target) as AutoGroupedConsole;

  Object.defineProperty(proxy, 'group', {
    configurable: true,
    writable: true,
    value: createWrapper(
      collapsedByDefault ? 'collapsed' : 'expanded',
      runCollapsed,
      runExpanded,
      fallbackCollapsed,
      fallbackExpanded
    ),
  });

  Object.defineProperty(proxy, 'groupCollapsed', {
    configurable: true,
    writable: true,
    value: createWrapper(
      'collapsed',
      runCollapsed,
      runExpanded,
      fallbackCollapsed,
      fallbackExpanded
    ),
  });

  return proxy;
}
