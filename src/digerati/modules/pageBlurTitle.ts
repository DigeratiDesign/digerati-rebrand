// src/digerati/modules/pageBlurTitle.ts

import { eventBus } from '$digerati/events';
import { log, warn } from '$digerati/utils/logger';

export interface PageBlurTitleOptions {
  messages: string[]; // required, no defaults
}

export class PageBlurTitle {
  private originalTitle: string;
  private messages: string[];
  private boundVisibilityChange: () => void;

  constructor(opts: PageBlurTitleOptions) {
    if (!opts.messages?.length) {
      warn('[PageBlurTitle] no messages provided; nothing will run.');
    }
    this.originalTitle = document.title;
    this.messages = opts.messages;
    this.boundVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /** pick a random message from the list */
  private getRandomMessage(): string {
    const i = Math.floor(Math.random() * this.messages.length);
    return this.messages[i];
  }

  /**
   * Handles document visibilitychange to set or restore title.
   */
  private handleVisibilityChange() {
    if (document.hidden) {
      document.title = this.getRandomMessage();
      log('PageBlurTitle set random blur title.');
      eventBus.emit('pageBlurTitle:blurred', { title: document.title });
    } else {
      document.title = this.originalTitle;
      log('PageBlurTitle restored original title.');
      eventBus.emit('pageBlurTitle:focused', { title: this.originalTitle });
    }
  }

  /**
   * Initializes visibility listener for blur/focus handling.
   */
  init() {
    if (!this.messages.length) return;
    document.addEventListener('visibilitychange', this.boundVisibilityChange);
    log('PageBlurTitle initialized.');
    eventBus.emit('pageBlurTitle:initialized', { messagesCount: this.messages.length });
  }

  /**
   * Cleans up listeners and restores title.
   */
  destroy() {
    document.removeEventListener('visibilitychange', this.boundVisibilityChange);
    document.title = this.originalTitle;
    log('PageBlurTitle destroyed and original title restored.');
    eventBus.emit('pageBlurTitle:destroyed');
  }
}

/**
 * Convenience initializer.
 */
export const initPageBlurTitle = (opts: PageBlurTitleOptions) => {
  const blurTitle = new PageBlurTitle(opts);
  blurTitle.init();
  return blurTitle;
};
