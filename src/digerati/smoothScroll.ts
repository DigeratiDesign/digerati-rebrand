type EasingName =
    | "linear"
    | "easeInQuad"
    | "easeOutQuad"
    | "easeInOutQuad"
    | "easeInCubic"
    | "easeOutCubic"
    | "easeInOutCubic";

interface SmoothScrollOptions {
    duration?: number; // milliseconds
    easing?: EasingName;
}

export const smoothScroll = (options: Partial<SmoothScrollOptions> = {}) => {
    // guard against double initialization
    if ((window as any).__smoothScrollInitialized) return;
    (window as any).__smoothScrollInitialized = true;

    const SCROLL_SETTINGS = {
        duration: 1000,
        easing: "easeInOutCubic" as EasingName,
        ...options,
    };

    const EASING_FUNCTIONS: Record<EasingName, (t: number) => number> = {
        linear: (t) => t,
        easeInQuad: (t) => t * t,
        easeOutQuad: (t) => t * (2 - t),
        easeInOutQuad: (t) =>
            t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: (t) => t * t * t,
        easeOutCubic: (t) => {
            t -= 1;
            return t * t * t + 1;
        },
        easeInOutCubic: (t) =>
            t < 0.5
                ? 4 * t * t * t
                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    };

    // disable Webflow's default anchor scroll if jQuery is available
    if ((window as any).jQuery) {
        (window as any).jQuery(function () {
            (window as any).jQuery(document).off("click.wf-scroll");
        });
    }

    const getOffset = (): number => {
        const navbar = document.querySelector<HTMLElement>("[ms-code-scroll-offset]");
        if (!navbar) return 0;
        const navbarHeight = navbar.offsetHeight;
        const customOffset = parseInt(
            navbar.getAttribute("ms-code-scroll-offset") || "0",
            10
        );
        return navbarHeight + customOffset;
    };

    const smoothScrollTo = (target: HTMLElement) => {
        const startPosition = window.pageYOffset;
        const offset = getOffset();
        const targetPosition =
            target.getBoundingClientRect().top + startPosition - offset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(
                timeElapsed / SCROLL_SETTINGS.duration,
                1
            );
            const easeProgress = EASING_FUNCTIONS[SCROLL_SETTINGS.easing](progress);
            window.scrollTo(0, startPosition + distance * easeProgress);
            if (timeElapsed < SCROLL_SETTINGS.duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    const handleClick = (e: Event) => {
        const anchor = e.currentTarget as HTMLAnchorElement;
        const href = anchor.getAttribute("href") || "";
        if (href.startsWith("#")) {
            e.preventDefault();
            const target = document.getElementById(href.slice(1));
            if (target) {
                smoothScrollTo(target);
            }
        }
    };

    const handleHashChange = () => {
        if (window.location.hash) {
            const target = document.getElementById(
                window.location.hash.slice(1)
            );
            if (target) {
                setTimeout(() => smoothScrollTo(target), 0);
            }
        }
    };

    // attach listeners
    document
        .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
        .forEach((anchor) => {
            anchor.addEventListener("click", handleClick);
        });
    window.addEventListener("hashchange", handleHashChange);

    // initial hash handling
    handleHashChange();
};
