// src/digerati/modules/autoHideNavbarOnScroll.ts

/**
 * Auto Hide Navbar On Scroll
 * 
 * Hides the navbar when scrolling down, reveals when scrolling up. 
 * Respects open navigation/menu state and delays activation when loaded with a hash.
 * 
 * @author <cabal@digerati.design>
 */
import { autoGroup, log } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface AutoHideNavbarOnScrollOptions {
  headerSelector?: string;
  hiddenClass?: string;
  injectCSS?: boolean;
  cssId?: string;
  scrollTolerance?: number;
  initialDelayWithoutHash?: number;
  hashActivationFallbackMs?: number;
}

const MENU_BUTTON_SELECTOR = ".w-nav-button";
const MENU_CONTAINER_SELECTOR = ".w-nav";
const OPEN_CLASS = "w--open";

class AutoHideNavbarOnScrollController {
  private header: HTMLElement | null;
  private lastY: number;
  private ticking: boolean;
  private hiddenClass: string;
  private menuObservers: MutationObserver[] = [];
  private menuContainerObserver: MutationObserver | null = null;
  private active: boolean = false;
  private loadedWithHash: boolean;
  private initialY: number;
  private scrollTolerance: number;
  private initialDelayWithoutHash: number;
  private hashActivationFallbackMs: number;
  private lastMenuOpenState: boolean | null = null;
  private isHidden: boolean = false;

  constructor({
    headerSelector = "header",
    hiddenClass = "navbar-hidden",
    scrollTolerance = 5,
    initialDelayWithoutHash = 100,
    hashActivationFallbackMs = 500
  }: Partial<AutoHideNavbarOnScrollOptions> = {}) {
    this.header = document.querySelector<HTMLElement>(headerSelector);
    this.lastY = window.pageYOffset;
    this.ticking = false;
    this.hiddenClass = hiddenClass!;
    this.loadedWithHash = !!window.location.hash;
    this.initialY = window.pageYOffset;
    this.scrollTolerance = scrollTolerance!;
    this.initialDelayWithoutHash =
      typeof initialDelayWithoutHash === "number" ? initialDelayWithoutHash : 100;
    this.hashActivationFallbackMs =
      typeof hashActivationFallbackMs === "number" ? hashActivationFallbackMs : 500;

    this.scrollListener = this.scrollListener.bind(this);
    this.update = this.update.bind(this);

    this.watchMenus();
  }

  private scrollListener(): void {
    if (!this.ticking) {
      window.requestAnimationFrame(this.update);
      this.ticking = true;
    }
  }

  private isMenuOpen = (): boolean => {
    if (document.querySelector(`${MENU_BUTTON_SELECTOR}.${OPEN_CLASS}`)) return true;
    const containers = document.querySelectorAll<HTMLElement>(MENU_CONTAINER_SELECTOR);
    for (const el of Array.from(containers)) {
      if (el.classList.contains(OPEN_CLASS)) return true;
    }
    return false;
  };

  private update(): void {
    this.ticking = false;
    if (!this.header) return;

    if (this.isMenuOpen()) {
      if (this.isHidden) {
        this.showHeader();
      }
      this.lastY = window.pageYOffset;
      return;
    }

    if (!this.active) {
      this.lastY = window.pageYOffset;
      return;
    }

    const currentY = window.pageYOffset;
    const delta = currentY - this.lastY;

    if (Math.abs(delta) < this.scrollTolerance) {
      return;
    }

    if (currentY <= 0) {
      this.showHeader();
    } else if (delta > 0) {
      this.hideHeader();
    } else if (delta < 0) {
      this.showHeader();
    }

    this.lastY = currentY;
  }

  private hideHeader(): void {
    if (!this.header || this.isHidden) return;
    this.header.classList.add(this.hiddenClass);
    this.isHidden = true;
    log("Navbar hidden due to scroll down.");
    eventBus.emit("autoHideNavbar:hide");
  }

  private showHeader(): void {
    if (!this.header || !this.isHidden) return;
    this.header.classList.remove(this.hiddenClass);
    this.isHidden = false;
    log("Navbar shown (scroll up or menu open).");
    eventBus.emit("autoHideNavbar:show");
  }

  private attachObserver = (el: Element) => {
    const mo = new MutationObserver(() => {
      this.handleMenuStateChange();
    });
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    this.menuObservers.push(mo);
  };

  private watchMenus(): void {
    document.querySelectorAll(MENU_BUTTON_SELECTOR).forEach(this.attachObserver);
    document.querySelectorAll(MENU_CONTAINER_SELECTOR).forEach(this.attachObserver);

    this.menuContainerObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            if (
              node.matches(MENU_BUTTON_SELECTOR) ||
              node.matches(MENU_CONTAINER_SELECTOR)
            ) {
              this.attachObserver(node);
              this.handleMenuStateChange();
            } else {
              node
                .querySelectorAll(MENU_BUTTON_SELECTOR)
                .forEach(this.attachObserver);
              node
                .querySelectorAll(MENU_CONTAINER_SELECTOR)
                .forEach(this.attachObserver);
            }
          });
        }
      }
    });
    this.menuContainerObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private handleMenuStateChange(): void {
    const isOpen = this.isMenuOpen();
    if (this.lastMenuOpenState === isOpen) return;
    this.lastMenuOpenState = isOpen;
    log("Menu open state changed:", isOpen);
    eventBus.emit("autoHideNavbar:menuStateChanged", { isOpen });

    if (isOpen) {
      this.showHeader();
    } else {
      this.lastY = window.pageYOffset;
    }
  }

  init(): void {
    if (!this.header) return;

    autoGroup("AutoHideNavbarOnScroll Init", () => {
      this.header!.classList.remove(this.hiddenClass);
      this.lastY = window.pageYOffset;
      this.initialY = window.pageYOffset;
      this.ticking = false;

      window.addEventListener("scroll", this.scrollListener, { passive: true });

      this.handleMenuStateChange();

      if (this.loadedWithHash) {
        const onFirstMove = () => {
          const currentY = window.pageYOffset;
          if (Math.abs(currentY - this.initialY) > 10) {
            this.active = true;
            window.removeEventListener("scroll", onFirstMove);
            log("AutoHideNavbarOnScroll activated after scroll movement (hash load).");
            eventBus.emit("autoHideNavbar:activated", { reason: "scroll" });
          }
        };
        window.addEventListener("scroll", onFirstMove, { passive: true });
        setTimeout(() => {
          if (!this.active) {
            this.active = true;
            window.removeEventListener("scroll", onFirstMove);
            log("AutoHideNavbarOnScroll activated after fallback timeout (hash load).");
            eventBus.emit("autoHideNavbar:activated", { reason: "timeout" });
          }
        }, this.hashActivationFallbackMs);
      } else {
        setTimeout(() => {
          this.active = true;
          log("AutoHideNavbarOnScroll activated after initial delay.");
          eventBus.emit("autoHideNavbar:activated", { reason: "initial-delay" });
        }, this.initialDelayWithoutHash);
      }

      eventBus.emit("autoHideNavbar:initialized", {
        hiddenClass: this.hiddenClass
      });
    });
  }

  destroy(): void {
    window.removeEventListener("scroll", this.scrollListener);
    if (this.header) {
      this.header.classList.remove(this.hiddenClass);
    }
    this.menuObservers.forEach((mo) => mo.disconnect());
    this.menuObservers = [];
    if (this.menuContainerObserver) {
      this.menuContainerObserver.disconnect();
      this.menuContainerObserver = null;
    }
    log("AutoHideNavbarOnScroll destroyed.");
    eventBus.emit("autoHideNavbar:destroyed");
  }
}

/**
 * Primary export: auto-hide navbar on scroll.
 */
export const autoHideNavbarOnScroll = (opts: AutoHideNavbarOnScrollOptions = {}) => {
  const {
    headerSelector = "header",
    hiddenClass = "navbar-hidden",
    injectCSS = true,
    cssId = "auto-hide-navbar-on-scroll-styles"
  } = opts;

  if (injectCSS && !document.getElementById(cssId)) {
    const style = document.createElement("style");
    style.id = cssId;
    style.textContent = `
${headerSelector} {
  --nav-speed: 0.25s;
  --nav-easing: ease-out;
  transition: transform var(--nav-speed) var(--nav-easing);
  transform: translateY(0);
}
.${hiddenClass} {
  --nav-speed: 0.5s;
  --nav-easing: ease-in;
  transform: translateY(-140%);
}
`;
    document.head.appendChild(style);
  }

  const controller = new AutoHideNavbarOnScrollController({
    headerSelector: opts.headerSelector,
    hiddenClass: opts.hiddenClass,
    scrollTolerance: opts.scrollTolerance,
    initialDelayWithoutHash: opts.initialDelayWithoutHash,
    hashActivationFallbackMs: opts.hashActivationFallbackMs
  } as any);
  controller.init();
  return controller;
};
