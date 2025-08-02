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
  private boundVisibilityChange: () => void;

  constructor(opts: PageBlurTitleCyclerOptions) {
    if (!opts.messages || !opts.messages.length) {
      warn("[PageBlurTitleCycler] no messages provided; nothing will run.");
    }
    this.originalTitle = document.title;
    this.messages = opts.messages;
    this.interval = typeof opts.interval === "number" ? opts.interval : 750;
    this.idx = 0;
    this.timerId = null;

    this.boundVisibilityChange = this.handleVisibilityChange.bind(this);
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
   * Handles document visibilitychange to start/stop cycling on tab blur/focus.
   */
  private handleVisibilityChange() {
    if (document.hidden) {
      // only start when the page is actually hidden (tab blurred)
      this.start();
    } else {
      // restore original title when page becomes visible
      this.stop();
    }
  }

  /**
   * Initializes visibility listener for blur/focus handling.
   */
  init() {
    document.addEventListener("visibilitychange", this.boundVisibilityChange);
    log("PageBlurTitleCycler initialized.");
    eventBus.emit("pageBlurTitleCycler:initialized", { messagesCount: this.messages.length });
  }

  /**
   * Cleans up listeners and restores title.
   */
  destroy() {
    document.removeEventListener("visibilitychange", this.boundVisibilityChange);
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
