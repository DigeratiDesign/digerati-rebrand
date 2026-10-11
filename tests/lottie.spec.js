import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
const source = readFileSync(resolve('src/client/modules/lottie.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
}).outputText;
function harness({ ios = true, loaded = true, count = 3 } = {}) {
  const frames = new Map();
  const timers = new Map();
  const listeners = new Map();
  const events = [];
  let nextId = 0;
  let maxPlaying = 0;
  const containers = Array.from({ length: count }, (_, id) => ({
    id,
    getAttribute: () => `animation-${id}.json`,
    getBoundingClientRect: () => ({ width: 100, height: 100 }),
  }));
  const animations = [];
  class FakeAnimation {
    constructor(options) {
      this.options = options;
      this.isLoaded = loaded;
      this.isPaused = true;
      this.destroyed = false;
      this.destroyCalls = 0;
      this.currentFrame = 0;
      this.totalFrames = 60;
      this.frameRate = 30;
      this.playSpeed = 1;
      this.callbacks = new Map();
      this.isPaused = !options.autoplay;
    }
    addEventListener(event, callback) {
      if (!this.callbacks.has(event)) this.callbacks.set(event, new Set());
      this.callbacks.get(event).add(callback);
    }
    removeEventListener(event, callback) {
      this.callbacks.get(event)?.delete(callback);
    }
    play() {
      expect(this.destroyed).toBe(false);
      this.isPaused = false;
      maxPlaying = Math.max(
        maxPlaying,
        animations.filter((a) => !a.isPaused && !a.destroyed).length
      );
    }
    pause() {
      expect(this.destroyed).toBe(false);
      this.isPaused = true;
    }
    destroy() {
      this.destroyCalls++;
      this.destroyed = true;
      this.isPaused = true;
    }
    emit(event) {
      if (event === 'DOMLoaded') this.isLoaded = true;
      [...(this.callbacks.get(event) || [])].forEach((fn) => fn());
    }
  }
  const observers = [];
  const addEventListener = (event, fn) => {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
  };
  const removeEventListener = (event, fn) => listeners.get(event)?.delete(fn);
  const document = {
    hidden: false,
    querySelectorAll: () => containers,
    addEventListener,
    removeEventListener,
  };
  const exports = {};
  runInNewContext(compiled, {
    exports,
    document,
    navigator: { userAgent: ios ? 'iPhone' : 'Desktop' },
    window: { addEventListener, removeEventListener },
    require: (id) =>
      id === 'lottie-web'
        ? {
            loadAnimation: (options) => {
              const animation = new FakeAnimation(options);
              animations.push(animation);
              return animation;
            },
          }
        : id.includes('events')
          ? { eventBus: { emit: (event) => events.push(event) } }
          : { log: () => {} },
    requestAnimationFrame: (fn) => {
      frames.set(++nextId, fn);
      return nextId;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    setTimeout: (fn) => {
      timers.set(++nextId, fn);
      return nextId;
    },
    clearTimeout: (id) => timers.delete(id),
    IntersectionObserver: class {
      constructor(callback, options) {
        expect(options.threshold).toBe(0.2);
        this.record = { callback, disconnected: false };
        observers.push(this.record);
      }
      observe() {
        this.record.disconnected = false;
      }
      disconnect() {
        this.record.disconnected = true;
      }
    },
  });
  const cleanup = exports.lottieInit();
  const dispatch = (event, data = {}) =>
    [...(listeners.get(event) || [])].forEach((fn) => fn(data));
  return {
    animations,
    frames,
    timers,
    events,
    observers,
    cleanup,
    init: exports.lottieInit,
    enter: (index = 0) => observers[index].callback([{ isIntersecting: true }]),
    exit: (index = 0) => observers[index].callback([{ isIntersecting: false }]),
    flush: () => {
      for (let i = 0; i < 3; i++) {
        const pending = [...frames.entries()];
        pending.forEach(([id, fn]) => {
          frames.delete(id);
          fn();
        });
      }
    },
    timeout: () =>
      [...timers.entries()].forEach(([id, fn]) => {
        timers.delete(id);
        fn();
      }),
    hidden: (value) => {
      document.hidden = value;
      dispatch('visibilitychange');
    },
    dispatch,
    maxPlaying: () => maxPlaying,
  };
}
test('exit cancels initialization, including a callback already queued for execution', () => {
  const h = harness();
  h.enter();
  const stale = [...h.frames.values()][0];
  h.exit();
  stale();
  h.flush();
  expect(h.animations).toHaveLength(0);
  expect(h.frames.size).toBe(0);
});
test('rapid enter/exit/enter only initializes the current generation once', () => {
  const h = harness();
  h.enter();
  const stale = [...h.frames.values()][0];
  h.exit();
  h.enter();
  stale();
  h.flush();
  expect(h.animations).toHaveLength(1);
  expect(h.animations[0].isPaused).toBe(false);
});
test('simultaneous iOS entries have one playback owner even before any loop completes', () => {
  const h = harness();
  h.enter(0);
  h.enter(1);
  h.enter(2);
  h.flush();
  expect(h.maxPlaying()).toBe(1);
  expect(h.animations.map((a) => a.isPaused)).toEqual([true, true, false]);
  expect(h.animations.every((a) => a.options.renderer === 'canvas' && !a.options.autoplay)).toBe(
    true
  );
});
test('ownership transfer pauses the old owner without permitting its old callbacks to reclaim playback', () => {
  const h = harness();
  h.enter(0);
  h.flush();
  h.enter(1);
  h.flush();
  h.animations[0].emit('loopComplete');
  expect(h.animations[0].isPaused).toBe(true);
  expect(h.animations[1].isPaused).toBe(false);
  expect(h.maxPlaying()).toBe(1);
});
test('data-ready callback cannot start an exited or destroyed animation', () => {
  const h = harness({ loaded: false });
  h.enter();
  h.flush();
  const a = h.animations[0];
  const stale = [...a.callbacks.get('DOMLoaded')][0];
  h.exit();
  a.isLoaded = true;
  stale();
  expect(a.destroyCalls).toBe(1);
  expect(a.isPaused).toBe(true);
});
test('data loading and layout readiness must both belong to the current visibility generation', () => {
  const h = harness({ loaded: false });
  h.enter();
  h.flush();
  h.hidden(true);
  h.hidden(false);
  h.animations[0].emit('DOMLoaded');
  expect(h.animations[0].isPaused).toBe(true);
  h.flush();
  expect(h.animations[0].isPaused).toBe(false);
});
test('exit while playing finishes the current loop, then destroys exactly once', () => {
  const h = harness();
  h.enter();
  h.flush();
  const a = h.animations[0];
  h.exit();
  expect(a.destroyCalls).toBe(0);
  expect(h.timers.size).toBe(1);
  a.emit('loopComplete');
  h.timeout();
  a.emit('loopComplete');
  expect(a.destroyCalls).toBe(1);
  expect(h.timers.size).toBe(0);
});
test('paused offscreen animation is destroyed immediately', () => {
  const h = harness();
  h.enter(0);
  h.flush();
  h.enter(1);
  h.flush();
  h.exit(0);
  expect(h.animations[0].destroyCalls).toBe(1);
  expect(h.timers.size).toBe(0);
});
test('repeated exit while awaiting a loop does not create more cleanup work', () => {
  const h = harness();
  h.enter();
  h.flush();
  h.exit();
  h.exit();
  expect(h.timers.size).toBe(1);
  h.timeout();
  expect(h.animations[0].destroyCalls).toBe(1);
});
test('stalled offscreen playback has deterministic fallback cleanup', () => {
  const h = harness();
  h.enter();
  h.flush();
  h.exit();
  h.timeout();
  expect(h.animations[0].destroyCalls).toBe(1);
});
test('reentry before the loop boundary reuses the instance and cancels destruction', () => {
  const h = harness();
  h.enter();
  h.flush();
  h.exit();
  h.enter();
  h.flush();
  h.animations[0].emit('loopComplete');
  h.timeout();
  expect(h.animations).toHaveLength(1);
  expect(h.animations[0].destroyCalls).toBe(0);
  expect(h.timers.size).toBe(0);
});
test('reentry after destruction creates one new instance and ignores old loop callbacks', () => {
  const h = harness();
  h.enter();
  h.flush();
  const a = h.animations[0];
  const stale = [...a.callbacks.get('loopComplete')][0];
  h.exit();
  a.emit('loopComplete');
  h.enter();
  h.flush();
  stale();
  expect(h.animations).toHaveLength(2);
  expect(a.destroyCalls).toBe(1);
  expect(h.animations[1].destroyCalls).toBe(0);
});
test('a queued destruction timer cannot affect a later exit after reentry', () => {
  const h = harness();
  h.enter();
  h.flush();
  h.exit();
  const stale = [...h.timers.values()][0];
  h.enter();
  h.flush();
  h.exit();
  stale();
  expect(h.animations[0].destroyCalls).toBe(0);
  expect(h.timers.size).toBe(1);
  h.timeout();
  expect(h.animations[0].destroyCalls).toBe(1);
});
test('repeated scrolling releases all instances, callbacks and cleanup tasks', () => {
  const h = harness();
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 3; j++) {
      h.enter(j);
      h.flush();
      h.exit(j);
      h.animations.at(-1).emit('loopComplete');
    }
    expect(h.animations.filter((a) => !a.destroyed)).toHaveLength(0);
    expect(h.timers.size).toBe(0);
    expect(h.frames.size).toBe(0);
  }
  expect(
    h.animations.every(
      (a) => a.destroyCalls === 1 && [...a.callbacks.values()].every((set) => set.size === 0)
    )
  ).toBe(true);
  expect(h.observers).toHaveLength(3);
  expect(h.maxPlaying()).toBe(1);
});
test('desktop preserves SVG rendering and its deferred loop-boundary pause policy', () => {
  const h = harness({ ios: false });
  h.enter(0);
  h.enter(1);
  h.enter(2);
  h.flush();
  expect(h.animations.every((a) => a.options.renderer === 'svg')).toBe(true);
  expect(h.animations[0].isPaused).toBe(false);
  h.animations[0].emit('loopComplete');
  expect(h.animations.map((a) => a.isPaused)).toEqual([true, false, false]);
  h.exit(0);
  expect(h.animations[0].destroyCalls).toBe(1);
});
test('desktop destruction removes tracking references across repeated cycles', () => {
  const h = harness({ ios: false });
  for (let i = 0; i < 25; i++) {
    h.enter(0);
    h.flush();
    h.exit(0);
    h.animations.at(-1).emit('loopComplete');
  }
  h.enter(0);
  h.enter(1);
  h.enter(2);
  h.flush();
  const live = h.animations.slice(-3);
  live[0].emit('loopComplete');
  expect(live.map((a) => a.isPaused)).toEqual([true, false, false]);
});
test('page visibility suspends playback and restores the one-owner policy', () => {
  const h = harness();
  h.enter(0);
  h.enter(1);
  h.flush();
  h.hidden(true);
  expect(h.animations.every((a) => a.isPaused)).toBe(true);
  h.hidden(false);
  h.flush();
  expect(h.maxPlaying()).toBe(1);
});
test('pagehide cleans exactly once and invalidates pending frames', () => {
  const h = harness();
  h.enter();
  h.flush();
  h.enter(1);
  const stale = [...h.frames.values()][0];
  h.dispatch('pagehide', { persisted: false });
  stale();
  h.cleanup();
  expect(h.animations).toHaveLength(1);
  expect(h.animations[0].destroyCalls).toBe(1);
  expect(h.observers.every((o) => o.disconnected)).toBe(true);
  expect(h.frames.size).toBe(0);
});
test('back-forward cache restores observation without keeping old instances', () => {
  const h = harness();
  h.enter();
  h.flush();
  h.dispatch('pagehide', { persisted: true });
  expect(h.animations[0].destroyCalls).toBe(1);
  h.dispatch('pageshow', { persisted: true });
  h.enter();
  h.flush();
  expect(h.animations).toHaveLength(2);
  expect(h.animations[1].isPaused).toBe(false);
});
test('initialization is idempotent and failed data loading releases the instance', () => {
  const h = harness({ loaded: false });
  expect(h.init()).toBe(h.cleanup);
  expect(h.observers).toHaveLength(3);
  h.enter();
  h.flush();
  h.animations[0].emit('data_failed');
  expect(h.animations[0].destroyCalls).toBe(1);
});

test('an older data-ready callback cannot take playback from a newer iOS request', () => {
  const h = harness({ loaded: false });
  h.enter(0);
  h.flush();
  h.enter(1);
  h.flush();
  h.animations[1].emit('DOMLoaded');
  h.animations[0].emit('DOMLoaded');
  expect(h.animations.map((a) => a.isPaused)).toEqual([true, false]);
  expect(h.maxPlaying()).toBe(1);
});

test('handoff destroys an offscreen owner rather than retaining a paused pending instance', () => {
  const h = harness();
  h.enter(0);
  h.flush();
  h.exit(0);
  h.enter(1);
  h.flush();
  expect(h.animations[0].destroyCalls).toBe(1);
  expect(h.animations[1].isPaused).toBe(false);
  expect(h.timers.size).toBe(0);
});
