// autoHideHeader.ts

export interface AutoHideHeaderOptions {
    headerSelector?: string;
    hiddenClass?: string;
    injectCSS?: boolean;
    cssId?: string;
}

const MENU_BUTTON_SELECTOR = ".w-nav-button";
const MENU_CONTAINER_SELECTOR = ".w-nav";
const OPEN_CLASS = "w--open";

class AutoHideHeaderController {
    private header: HTMLElement | null;
    private lastY: number;
    private ticking: boolean;
    private hiddenClass: string;
    private scrollListener: () => void;
    private menuObservers: MutationObserver[] = [];
    private menuContainerObserver: MutationObserver | null = null;
    private active: boolean = false; // whether scroll-hide logic is active
    private loadedWithHash: boolean;
    private initialY: number;

    constructor({
        headerSelector = "header",
        hiddenClass = "navbar-hidden",
    }: Partial<AutoHideHeaderOptions> = {}) {
        this.header = document.querySelector<HTMLElement>(headerSelector);
        this.lastY = window.pageYOffset;
        this.ticking = false;
        this.hiddenClass = hiddenClass!;
        this.loadedWithHash = !!window.location.hash;
        this.initialY = window.pageYOffset;

        this.scrollListener = () => {
            if (!this.ticking) {
                window.requestAnimationFrame(this.update);
                this.ticking = true;
            }
        };
    }

    private isMenuOpen = (): boolean => {
        // if nav button has open class, menu is open
        if (document.querySelector(`${MENU_BUTTON_SELECTOR}.${OPEN_CLASS}`)) return true;
        // fallback: container-based open state
        const containers = document.querySelectorAll<HTMLElement>(MENU_CONTAINER_SELECTOR);
        for (const el of Array.from(containers)) {
            if (el.classList.contains(OPEN_CLASS)) return true;
        }
        return false;
    };

    private update = () => {
        if (!this.header) {
            this.ticking = false;
            return;
        }

        // if menu is open, disable autohide: keep header visible
        if (this.isMenuOpen()) {
            this.header.classList.remove(this.hiddenClass);
            this.lastY = window.pageYOffset;
            this.ticking = false;
            return;
        }

        // don't apply scroll-hide logic until activation (grace)
        if (!this.active) {
            this.lastY = window.pageYOffset;
            this.ticking = false;
            return;
        }

        const currentY = window.pageYOffset;
        if (currentY <= 0) {
            this.header.classList.remove(this.hiddenClass);
        } else if (currentY > this.lastY) {
            this.header.classList.add(this.hiddenClass);
        } else if (currentY < this.lastY) {
            this.header.classList.remove(this.hiddenClass);
        }
        this.lastY = currentY;
        this.ticking = false;
    };

    private attachObserver = (el: Element) => {
        const mo = new MutationObserver(() => {
            this.update();
        });
        mo.observe(el, { attributes: true, attributeFilter: ["class"] });
        this.menuObservers.push(mo);
    };

    private watchMenus(): void {
        // observe existing menu/button elements
        document.querySelectorAll(MENU_BUTTON_SELECTOR).forEach(this.attachObserver);
        document.querySelectorAll(MENU_CONTAINER_SELECTOR).forEach(this.attachObserver);

        // watch DOM for newly added menu/button elements
        this.menuContainerObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "childList" && mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (!(node instanceof Element)) return;
                        if (node.matches(MENU_BUTTON_SELECTOR) || node.matches(MENU_CONTAINER_SELECTOR)) {
                            this.attachObserver(node);
                            this.update();
                        } else {
                            node.querySelectorAll(MENU_BUTTON_SELECTOR).forEach(this.attachObserver);
                            node.querySelectorAll(MENU_CONTAINER_SELECTOR).forEach(this.attachObserver);
                        }
                    });
                }
            }
        });
        this.menuContainerObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    init(): void {
        if (!this.header) return;

        // ensure visible on load
        this.header.classList.remove(this.hiddenClass);
        this.lastY = window.pageYOffset;
        this.initialY = window.pageYOffset;
        this.ticking = false;

        window.addEventListener("scroll", this.scrollListener, { passive: true });
        this.watchMenus();

        // if menu is already open on load, keep header visible
        if (this.isMenuOpen()) {
            this.header.classList.remove(this.hiddenClass);
        }

        if (this.loadedWithHash) {
            // delay activation until user scrolls enough or fallback timeout
            const onFirstMove = () => {
                const currentY = window.pageYOffset;
                if (Math.abs(currentY - this.initialY) > 10) {
                    this.active = true;
                    window.removeEventListener("scroll", onFirstMove);
                }
            };
            window.addEventListener("scroll", onFirstMove, { passive: true });
            setTimeout(() => {
                this.active = true;
                window.removeEventListener("scroll", onFirstMove);
            }, 500);
        } else {
            setTimeout(() => {
                this.active = true;
            }, 100);
        }
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
    }
}

export const autoHideHeader = (opts: AutoHideHeaderOptions = {}) => {
    const {
        headerSelector = "header",
        hiddenClass = "navbar-hidden",
        injectCSS = true,
        cssId = "auto-hide-header-styles",
    } = opts;

    if (injectCSS && !document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
${headerSelector} {
  /* default (reveal) settings */
  --nav-speed: 0.25s;
  --nav-easing: ease-out;

  transition: transform var(--nav-speed) var(--nav-easing);
  transform: translateY(0);
}
.${hiddenClass} {
  --nav-speed: 0.5s;
  --nav-easing: ease-in;

  transform: translateY(-105%);
}
`;
        document.head.appendChild(style);
    }

    const controller = new AutoHideHeaderController({
        headerSelector,
        hiddenClass,
    });
    controller.init();
    return controller;
};
