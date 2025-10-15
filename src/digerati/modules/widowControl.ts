// src/digerati/modules/widowControl.ts
/* eslint-disable @typescript-eslint/ban-ts-comment */

/**
 * Widow Control (keep last N words together).
 *
 * For each target element, replace the final (N-1) breaking spaces
 * in its text nodes with NBSP so the last N words stay together.
 *
 * - No layout reads or measurement.
 * - Preserves HTML structure and IX2/event bindings (mutates Text nodes only).
 * - Skips elements with too few words and respects skip selectors (.no-widow, etc.).
 * - Extra debug logging for heading detection and node traversal.
 *
 * @author <cabal@digerati.design>
 */

import { eventBus } from '$digerati/events';
import { autoGroup, log, warn } from '$digerati/utils/logger';

export interface WidowControlOptions {
  selector?: string; // default 'p, li'
  skipSelectors?: string[]; // e.g. ['[aria-hidden="true"]', '.no-widow']
  nowrapCount?: number; // keep last N words together; default 2 (min 2)
  markAttr?: string; // attribute set after processing; default 'data-dd-widow'
  debug?: boolean; // when true, logs per-element skip decisions
}

export const widowControl = (opts: WidowControlOptions = {}) => {
  autoGroup('Widow Control', () => {
    const selector = opts.selector ?? 'p, li';
    const skipSelectors = opts.skipSelectors ?? ['[aria-hidden="true"]', '.no-widow'];
    const nowrapCount = Math.max(2, opts.nowrapCount ?? 2);
    const markAttr = opts.markAttr ?? 'data-dd-widow';
    const debug = !!opts.debug;

    const skipList = skipSelectors.length
      ? skipSelectors.flatMap((s) => [s, `${s} *`]).join(',')
      : '';

    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) {
      warn(`No targets found for selector "${selector}".`);
      eventBus.emit('widow:empty', { selector });
      return;
    }

    log(`Processing ${targets.length} elements (nowrapCount=${nowrapCount}).`);
    if (debug) {
      targets.forEach((el) =>
        log('widow:debug-scan', {
          tag: el.tagName,
          className: el.className,
          matchesSkip: skipList ? el.matches(skipList) : false,
          closestSkip: skipSelectors.length ? !!el.closest(skipSelectors.join(',')) : false,
        })
      );
    }

    targets.forEach((el) => {
      const tag = el.tagName.toLowerCase();

      // Skip headings entirely — diagnostic logging included
      if (/^h[1-6]$/.test(tag)) {
        el.setAttribute(markAttr, 'skipped-heading');
        if (debug) log('[widow] skip heading', { tag, text: el.textContent });
        eventBus.emit('widow:skipped', { el, reason: 'heading' });
        return;
      }

      // 1) Respect skip selectors (self or ancestor)
      const shouldSkip =
        (skipList && el.matches(skipList)) ||
        (skipSelectors.length && !!el.closest(skipSelectors.join(',')));

      if (shouldSkip) {
        if (el.getAttribute(markAttr) === 'fixed') revertWidow(el);
        el.setAttribute(markAttr, 'skipped');
        eventBus.emit('widow:skipped', { el, reason: 'skipSelector' });
        if (debug) log('[widow] skip selector match', { tag, className: el.className });
        return;
      }

      // 2) Skip already processed
      if (el.hasAttribute(markAttr)) return;

      const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
      const wordCount = text ? text.split(' ').filter(Boolean).length : 0;

      if (wordCount < nowrapCount) {
        el.setAttribute(markAttr, 'skipped-too-few-words');
        eventBus.emit('widow:skipped', { el, reason: 'tooFewWords' });
        if (debug) log('[widow] too few words', { tag, text });
        return;
      }

      const fixed = keepLastNWordsTogether(el, nowrapCount, debug);
      if (fixed) {
        el.setAttribute(markAttr, 'fixed');
        eventBus.emit('widow:fixed', { el, nowrapCount });
        if (debug) log('[widow] fixed', { tag, nowrapCount });
      } else {
        el.setAttribute(markAttr, 'noop');
        eventBus.emit('widow:noop', { el });
        if (debug) log('[widow] noop', { tag });
      }
    });

    log('Widow Control complete.');
  });
};

/**
 * Replace the last (N-1) breaking spaces in the flattened textContent
 * with NBSPs by mutating the correct Text nodes.
 */
function keepLastNWordsTogether(root: HTMLElement, n: number, debug = false): boolean {
  const flat = (root.textContent ?? '').replace(/\s+/g, ' ').replace(/\s+$/g, '');
  if (!flat) return false;

  const need = n - 1;
  const spacePositions: number[] = [];
  let idx = flat.length;

  while (spacePositions.length < need) {
    idx = flat.lastIndexOf(' ', idx - 1);
    if (idx === -1) break;
    spacePositions.push(idx);
  }

  if (spacePositions.length < need) return false;

  const NBSP = '\u00A0';
  for (const globalPos of spacePositions) {
    const ok = replaceSpaceAt(root, globalPos, NBSP, debug);
    if (!ok) {
      if (debug) log('[widow] replaceSpaceAt failed', { globalPos });
      return false;
    }
  }
  return true;
}

/**
 * Map a global text index into the appropriate Text node and replace
 * the single space character there with the provided replacement.
 * Now logs diagnostic info about which node and tag were touched.
 */
function replaceSpaceAt(
  root: HTMLElement,
  globalIndex: number,
  replacement: string,
  debug = false
): boolean {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;

      const tag = parent.tagName.toLowerCase();

      // Skip headings or elements that should be ignored
      if (/^h[1-6]$/.test(tag) || parent.matches('.no-widow, [aria-hidden="true"]')) {
        if (debug) log('[widow] skipping text node inside disallowed element', {
          tag,
          snippet: node.nodeValue?.slice(0, 30),
        });
        return NodeFilter.FILTER_REJECT;
      }

      return /\S/.test(node.nodeValue ?? '')
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  let offset = 0;
  let node = walker.nextNode() as Text | null;

  while (node) {
    const val = node.nodeValue ?? '';
    const len = val.length;

    if (globalIndex >= offset && globalIndex < offset + len) {
      const local = globalIndex - offset;
      if (val.charAt(local) !== ' ') return false;
      if (debug)
        log('[widow] replacing space', {
          tag: node.parentElement?.tagName.toLowerCase(),
          local,
          snippet: val.slice(Math.max(0, local - 10), local + 10),
        });
      node.nodeValue = val.slice(0, local) + replacement + val.slice(local + 1);
      return true;
    }

    offset += len;
    node = walker.nextNode() as Text | null;
  }

  return false;
}

/**
 * Revert NBSPs (\u00A0) back to normal spaces for a subtree.
 */
function revertWidow(root: HTMLElement): boolean {
  const NBSP = '\u00A0';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let changed = false;
  let n = walker.nextNode() as Text | null;
  while (n) {
    const v = n.nodeValue ?? '';
    if (v.includes(NBSP)) {
      n.nodeValue = v.replace(/\u00A0/g, ' ');
      changed = true;
    }
    n = walker.nextNode() as Text | null;
  }
  return changed;
}

// Example usage:
// widowControl({
//   selector: 'p, li',
//   skipSelectors: ['[aria-hidden="true"]', '.no-widow'],
//   nowrapCount: 2,
//   markAttr: 'data-dd-widow',
//   debug: true,
// });
