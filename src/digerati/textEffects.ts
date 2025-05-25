/**
 * Link Hover State ― wraps the inner text of every
 * `.text-rich-text a` and `.button` element so you can
 * animate the replacement text on hover.
 *
 * @author <cabal@digerati.design>
 */
export const linkHoverState = (): void => {
    const links: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(
        ".text-rich-text a, .button"
    );

    links.forEach((link: HTMLElement): void => {
        const buttonLabel: string = (link.textContent ?? "").trim();

        if (link.classList.contains("button")) {
            // Button: two nested spans so the data-replace lives
            // on the outer one (Webflow hover-out label trick)
            link.innerHTML = `<span data-replace="${buttonLabel}"><span>${buttonLabel}</span></span>`;
        } else {
            // Simple link: just one extra span
            link.innerHTML = `<span>${buttonLabel}</span>`;
            link.setAttribute("data-replace", buttonLabel);
        }
    });
};

/* ------------------------------------------------------------------ */

type ScrollHighlightTarget = HTMLElement;

/**
 * Highlight Text ― fades chars in/out while the
 * `.scroll-highlight` element is in view.
 *
 * Requires GSAP + ScrollTrigger + SplitText.
 *
 * @author <cabal@digerati.design>
 */
export const highlightText = (): void => {
    const targets: ScrollHighlightTarget[] = gsap.utils.toArray(
        ".scroll-highlight"
    ) as ScrollHighlightTarget[];
    targets.forEach((el) => {
        const split: SplitText = new SplitText(el, {
            type: "words,chars",
            autoSplit: true
        });
        gsap.from(split.chars as HTMLElement[], {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                markers: true
            },
            opacity: 0.2,
            stagger: 0.1,
        });
    });
};

/**
 * Unmask Text on Scroll
 * Reveals `.split` elements line-by-line when they enter the viewport.
 *
 * @author <cabal@digerati.design>
 */
export const unmaskText = () => {
    gsap.utils.toArray(".scroll-unmask").forEach((el) => {
        const split = new SplitText(el, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
            autoSplit: true
        });
        SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            linesClass: 'line',
            onSplit(self) {
                // ← only called when final, live DOM nodes are known
                return gsap.from(self.lines, {
                    yPercent: 100,
                    opacity: 0,
                    stagger: 0.08,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true,
                        onUpdate: self => console.log('progress:', self.progress.toFixed(2))
                    }
                });
            }
        });

    });
};