// src/digerati/modules/pageBlurTitleCycler.ts

import { autoGroup, log, warn } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface PageBlurTitleCyclerOptions {
  messages: string[]; // required, no defaults
  interval?: number; // milliseconds per message
}

export class PageBlurTitleCycler {
  private originalTitle: string;
  private messages: string[];
  private interval: number;
  private idx: number;
  private timerId: number | null;
  private boundBlur: () => void;
  private boundStop: () => void;

  constructor(opts: PageBlurTitleCyclerOptions) {
    if (!opts.messages || !opts.messages.length) {
      warn("[PageBlurTitleCycler] no messages provided; nothing will run.");
    }
    this.originalTitle = document.title;
    this.messages = opts.messages;
    this.interval = typeof opts.interval === "number" ? opts.interval : 750;
    this.idx = 0;
    this.timerId = null;

    this.boundBlur = this.handleBlur.bind(this);
    this.boundStop = this.stop.bind(this);
  }

  private start() {
    if (!this.messages || this.messages.length === 0) return;
    this.stop();
    this.idx = 0;
    document.title = this.messages[this.idx];
    this.timerId = window.setInterval(() => {
      this.idx = (this.idx + 1) % this.messages.length;
      document.title = this.messages[this.idx];
    }, this.interval);
    log("PageBlurTitleCycler started cycling titles.");
    eventBus.emit("pageBlurTitleCycler:started", { interval: this.interval });
  }

  private stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    document.title = this.originalTitle;
    log("PageBlurTitleCycler stopped and restored original title.");
    eventBus.emit("pageBlurTitleCycler:stopped", { title: this.originalTitle });
  }

  /**
   * Blur handler that ignores blurs caused by focusing into an iframe on the same page.
   */
  private handleBlur() {
    // defer to allow activeElement to update
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active && active.tagName === "IFRAME") {
        log("Blur ignored because focus moved into an iframe.");
        eventBus.emit("pageBlurTitleCycler:blurIgnoredIframe", { iframe: (active as HTMLIFrameElement).src || "unknown" });
        return;
      }
      // otherwise, proceed with cycling
      this.start();
    });
  }

  init() {
    window.addEventListener("blur", this.boundBlur);
    window.addEventListener("focus", this.boundStop);
    log("PageBlurTitleCycler initialized.");
    eventBus.emit("pageBlurTitleCycler:initialized", { messagesCount: this.messages.length });
  }

  destroy() {
    window.removeEventListener("blur", this.boundBlur);
    window.removeEventListener("focus", this.boundStop);
    this.stop();
    log("PageBlurTitleCycler destroyed.");
    eventBus.emit("pageBlurTitleCycler:destroyed", {});
  }
}

/**
 * Convenience initializer.
 */
export const initPageBlurTitleCycler = (opts: PageBlurTitleCyclerOptions) => {
  const cycler = new PageBlurTitleCycler(opts);
  cycler.init();
  return cycler;
};
