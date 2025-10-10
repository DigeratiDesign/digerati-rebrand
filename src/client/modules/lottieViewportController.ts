// src/client/modules/lottieViewportController.ts

import { autoGroup, log, warn, error } from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

interface LottieAnimation {
    play?: () => void;
    stop?: () => void;
    pause?: () => void;
    destroy?: () => void;
    setSpeed?: (speed: number) => void;
    goToAndStop?: (value: number, isFrame?: boolean) => void;
    isLoaded?: boolean;
    addEventListener?: (event: string, callback: () => void) => void;
    removeEventListener?: (event: string, callback: () => void) => void;
}

interface LottiePlayer {
    loadAnimation: (config: LottieAnimationConfig) => LottieAnimation;
}

type LottieRenderer = "svg" | "canvas" | "html";

interface LottieAnimationConfig {
    container: Element;
    name?: string;
    renderer?: LottieRenderer;
    loop?: boolean | number;
    autoplay?: boolean;
    rendererSettings?: Record<string, unknown>;
    path?: string;
    animationData?: unknown;
}

export interface LottieViewportControllerOptions {
    selector?: string;
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
    renderer?: LottieRenderer;
    resetOnExit?: boolean;
    destroyOnExit?: boolean;
    debug?: boolean;
}

declare global {
    interface Window {
        Webflow?: {
            require?: (moduleName: string) => LottiePlayer | undefined;
        };
        lottie?: LottiePlayer;
    }
}

interface ObservedAnimation {
    element: HTMLElement;
    animation: LottieAnimation;
    name: string;
}

const DEFAULT_SELECTOR = '[dd-lottie]';

export class LottieViewportController {
    private observer?: IntersectionObserver;
    private player?: LottiePlayer;
    private observed = new Map<HTMLElement, ObservedAnimation>();
    private readonly options: Required<Omit<LottieViewportControllerOptions, "root">> & {
        root?: Element | Document | null;
    };

    constructor(options: LottieViewportControllerOptions = {}) {
        this.options = {
            selector: options.selector ?? `${DEFAULT_SELECTOR}`,
            root: options.root ?? null,
            rootMargin: options.rootMargin ?? "0px",
            threshold: options.threshold ?? 0.35,
            renderer: options.renderer ?? "svg",
            resetOnExit: options.resetOnExit ?? true,
            destroyOnExit: options.destroyOnExit ?? false,
            debug: options.debug ?? false,
        };
    }

    public init() {
        const targets = Array.from(
            document.querySelectorAll<HTMLElement>(this.options.selector)
        );

        if (!targets.length) {
            warn(
                `[LottieViewportController] no elements matched selector "${this.options.selector}"`
            );
            eventBus.emit("lottieViewport:missingElements", {
                selector: this.options.selector,
            });
            return;
        }

        const player = this.resolvePlayer();

        if (!player) {
            error(
                "[LottieViewportController] Unable to locate a Lottie player. Ensure Webflow's Lottie module or window.lottie is available."
            );
            eventBus.emit("lottieViewport:missingPlayer");
            return;
        }

        this.player = player;
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersect(entries),
            {
                root: this.options.root ?? undefined,
                rootMargin: this.options.rootMargin,
                threshold: this.options.threshold,
            }
        );

        autoGroup("LottieViewportController", () => {
            targets.forEach((el) => {
                const observed = this.prepareAnimation(el);
                if (!observed) return;
                this.observer?.observe(el);
            });

            eventBus.emit("lottieViewport:initialized", {
                count: this.observed.size,
                selector: this.options.selector,
            });
            if (this.options.debug) {
                log(
                    `[LottieViewportController] observing ${this.observed.size} animation(s)`
                );
            }
        });
    }

    public destroy() {
        this.observer?.disconnect();
        this.observed.forEach(({ animation, name }) => {
            animation.stop?.();
            animation.destroy?.();
            if (this.options.debug) {
                log(`[LottieViewportController] destroyed animation ${name}`);
            }
        });
        const count = this.observed.size;
        this.observed.clear();
        eventBus.emit("lottieViewport:destroyed", { count });
    }

    private resolvePlayer(): LottiePlayer | undefined {
        if (this.player) return this.player;

        const globalPlayer = window.lottie;
        if (globalPlayer?.loadAnimation) {
            return globalPlayer;
        }

        const requireFn = window.Webflow?.require;
        if (typeof requireFn === "function") {
            try {
                const required = requireFn("lottie");
                if (required?.loadAnimation) {
                    return required;
                }
            } catch (err) {
                warn("[LottieViewportController] Webflow require('lottie') failed", err);
            }
        }

        return undefined;
    }

    private prepareAnimation(element: HTMLElement): ObservedAnimation | undefined {
        if (!this.player) return undefined;

        if (this.observed.has(element)) {
            return this.observed.get(element);
        }

        const name =
            element.dataset.lottieName ?? element.getAttribute("dd-lottie") ?? "lottie";
        const config = this.buildConfig(element, name);
        if (!config) {
            warn(
                `[LottieViewportController] missing animation source for element ${name}`,
                element
            );
            eventBus.emit("lottieViewport:missingSource", { element, name });
            return undefined;
        }

        const animation = this.player!.loadAnimation(config);

        const speed = this.getNumberAttr(element, "data-lottie-speed");
        if (typeof speed === "number") {
            animation.setSpeed?.(speed);
        }

        const observed: ObservedAnimation = {
            element,
            animation,
            name,
        };
        this.observed.set(element, observed);
        return observed;
    }

    private handleIntersect(entries: IntersectionObserverEntry[]) {
        entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            const observed =
                this.observed.get(target) ??
                (entry.isIntersecting ? this.prepareAnimation(target) : undefined);
            if (!observed) return;

            if (entry.isIntersecting) {
                this.play(observed);
            } else {
                this.stop(observed);
            }
        });
    }

    private play(observed: ObservedAnimation) {
        const { animation, name } = observed;
        if (!animation) return;

        if (animation.isLoaded === false) {
            const playOnReady = () => {
                animation.play?.();
                animation.removeEventListener?.("data_ready", playOnReady);
            };
            animation.addEventListener?.("data_ready", playOnReady);
        } else {
            animation.play?.();
        }
        eventBus.emit("lottieViewport:enter", { name, element: observed.element });
        if (this.options.debug) {
            log(`[LottieViewportController] playing animation ${name}`);
        }

    }

    private stop(observed: ObservedAnimation) {
        const { animation, name } = observed;
        animation.stop?.();
        if (this.options.resetOnExit) {
            animation.goToAndStop?.(0, true);
        }

        if (this.options.destroyOnExit) {
            animation.destroy?.();
            this.observed.delete(observed.element);
        }

        eventBus.emit("lottieViewport:exit", { name, element: observed.element });
        if (this.options.debug) {
            log(`[LottieViewportController] stopped animation ${name}`);
        }
    }

    private buildConfig(element: HTMLElement, name: string): LottieAnimationConfig | undefined {
        const path =
            element.dataset.lottieSrc ??
            element.getAttribute("data-lottie-src") ??
            element.getAttribute("data-src") ??
            element.getAttribute("data-path") ??
            undefined;

        let animationData: unknown;
        if (!path) {
            const script = element.querySelector<HTMLScriptElement>(
                "script[type='application/json']"
            );
            const json = script?.textContent?.trim();
            if (json) {
                try {
                    animationData = JSON.parse(json);
                } catch (err) {
                    error(
                        `[LottieViewportController] failed to parse inline animation data for ${name}`,
                        err
                    );
                    return undefined;
                }
            }
        }

        if (!path && !animationData) {
            return undefined;
        }

        const loopAttr = this.getLoopValue(element);
        const renderer =
            (element.dataset.lottieRenderer as LottieRenderer | undefined) ?? this.options.renderer;

        const config: LottieAnimationConfig = {
            container: element,
            name,
            renderer,
            loop: loopAttr,
            autoplay: false,
        };

        if (path) {
            config.path = path;
        }

        if (animationData) {
            config.animationData = animationData;
        }

        return config;
    }

    private getLoopValue(element: HTMLElement): boolean | number | undefined {
        const loopAttr = element.getAttribute("data-lottie-loop");
        if (loopAttr === null) return undefined;

        if (loopAttr === "" || loopAttr.toLowerCase() === "true") return true;
        if (loopAttr.toLowerCase() === "false") return false;

        const num = Number(loopAttr);
        return Number.isNaN(num) ? undefined : num;
    }

    private getNumberAttr(element: HTMLElement, attr: string): number | undefined {
        const value = element.getAttribute(attr);
        if (value === null || value === "") return undefined;
        const num = Number(value);
        return Number.isNaN(num) ? undefined : num;
    }
}

export const initLottieViewportController = (
    options?: LottieViewportControllerOptions
): LottieViewportController | undefined => {
    const controller = new LottieViewportController(options);
    controller.init();
    return controller;
};

