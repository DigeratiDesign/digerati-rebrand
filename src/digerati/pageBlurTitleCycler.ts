// pageBlurTitleCycler.ts

export interface PageBlurTitleCyclerOptions {
  messages: string[];      // required, no defaults
  interval?: number;       // milliseconds per message
}

export class PageBlurTitleCycler {
  private originalTitle: string;
  private messages: string[];
  private interval: number;
  private idx: number;
  private timerId: number | null;
  private boundStart: () => void;
  private boundStop: () => void;

  constructor(opts: PageBlurTitleCyclerOptions) {
    if (!opts.messages || !opts.messages.length) {
      console.warn("[PageBlurTitleCycler] no messages provided; nothing will run.");
    }
    this.originalTitle = document.title;
    this.messages = opts.messages;
    this.interval = typeof opts.interval === "number" ? opts.interval : 750;
    this.idx = 0;
    this.timerId = null;

    this.boundStart = this.start.bind(this);
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
  }

  private stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    document.title = this.originalTitle;
  }

  init() {
    window.addEventListener("blur", this.boundStart);
    window.addEventListener("focus", this.boundStop);
  }

  destroy() {
    window.removeEventListener("blur", this.boundStart);
    window.removeEventListener("focus", this.boundStop);
    this.stop();
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
