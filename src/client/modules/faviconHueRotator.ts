// src/client/modules/faviconHueRotator.ts

export interface FaviconHueRotatorOptions {
    /** Optional. If omitted, auto-discover from <link rel*="icon">. */
    src?: string;
    size?: number;        // default 32
    durationMs?: number;  // default 12000
    maxFps?: number;      // default 12
    cssVar?: string;      // default --h
    pauseWhenHidden?: boolean; // default true
    crossOrigin?: "anonymous" | ""; // default "anonymous"
    autostart?: boolean;  // default true
    debug?: boolean;      // default false
}

export class FaviconHueRotator {
    private readonly src?: string;
    private readonly size: number;
    private readonly durationMs: number;
    private readonly maxFps: number;
    private readonly cssVar: string;
    private readonly pauseWhenHidden: boolean;
    private readonly crossOrigin: "anonymous" | "";
    private readonly autostart: boolean;
    private readonly debug: boolean;

    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private linkEl: HTMLLinkElement | null = null;
    private img: HTMLImageElement | null = null;

    private rafId: number | null = null;
    private lastFaviconAt = 0;
    private started = false;

    private readonly linkId = "dgr-favicon";
    private readonly replaceLinkOnUpdate = true; // keep repaint reliable

    constructor(opts: FaviconHueRotatorOptions = {}) {
        this.src = opts.src;
        this.size = opts.size ?? 32;
        this.durationMs = opts.durationMs ?? 12000;
        this.maxFps = Math.max(1, opts.maxFps ?? 12);
        this.cssVar = opts.cssVar ?? "--h";
        this.pauseWhenHidden = opts.pauseWhenHidden ?? true;
        this.crossOrigin = opts.crossOrigin ?? "anonymous";
        this.autostart = opts.autostart ?? true;
        this.debug = opts.debug ?? false;
    }

    public init() {
        // Support detect
        const c = document.createElement("canvas");
        const ctx = c.getContext && c.getContext("2d");
        if (!ctx || typeof c.toDataURL !== "function") return;
        try { (ctx as any).filter = "hue-rotate(0deg)"; } catch { }
        if (!("filter" in ctx)) return;

        // Setup canvas
        this.canvas = c;
        this.ctx = ctx;
        c.width = this.size;
        c.height = this.size;

        // Discover src before creating our own link
        const src = this.src || this.discoverFaviconHref();
        if (!src) return;

        // Load base image
        this.img = new Image();
        if (this.crossOrigin && !src.startsWith("data:")) this.img.crossOrigin = this.crossOrigin;
        this.img.onload = () => {
            // Ensure our link exists and is last
            this.linkEl = this.createOrMoveIconLink(this.linkId, "icon", "image/png", `${this.size}x${this.size}`);
            if (this.autostart) this.start();
        };
        this.img.onerror = () => { /* swallow */ };
        this.img.src = src;

        addEventListener("pagehide", () => this.stop(), { once: true });
    }

    public start() {
        if (this.started || !this.ctx || !this.canvas || !this.img) return;
        this.started = true;

        const tick = (now: number) => {
            if (!this.started) return;
            if (this.pauseWhenHidden && document.hidden) {
                this.rafId = requestAnimationFrame(tick);
                return;
            }

            const phase = (now % this.durationMs) / this.durationMs; // 0..1
            const angle = Math.round(phase * 360);

            // write CSS var
            document.documentElement.style.setProperty(this.cssVar, `${angle}deg`);

            // throttle favicon redraw
            const minDelta = 1000 / this.maxFps;
            if (now - this.lastFaviconAt >= minDelta) {
                this.draw(angle);
                this.lastFaviconAt = now;
            }

            this.rafId = requestAnimationFrame(tick);
        };

        this.rafId = requestAnimationFrame(tick);
    }

    public stop() {
        if (!this.started) return;
        this.started = false;
        if (this.rafId != null) cancelAnimationFrame(this.rafId);
        this.rafId = null;
    }

    private draw(angleDeg: number) {
        if (!this.ctx || !this.canvas || !this.img) return;

        this.ctx.clearRect(0, 0, this.size, this.size);
        (this.ctx as any).imageSmoothingEnabled = false;
        (this.ctx as any).filter = `hue-rotate(${angleDeg}deg)`;
        this.ctx.drawImage(this.img, 0, 0, this.size, this.size);
        (this.ctx as any).filter = "none";

        const data = this.canvas.toDataURL("image/png");

        if (!this.linkEl) return;

        if (this.replaceLinkOnUpdate) {
            // Replace node to force Chrome repaint
            const old = this.linkEl;
            const link = document.createElement("link");
            link.id = this.linkId;
            link.rel = "icon";
            link.type = "image/png";
            link.sizes = `${this.size}x${this.size}`;
            link.href = data;
            document.head.appendChild(link);
            if (old.parentNode) old.parentNode.removeChild(old);
            this.linkEl = link;
        } else {
            this.linkEl.href = data;
            document.head.appendChild(this.linkEl); // keep it last
        }
    }

    private discoverFaviconHref(): string | null {
        // Ignore any of our own placeholders if present
        const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]'))
            .filter(l => l.id !== this.linkId);

        if (links.length === 0) return null;

        const parseSize = (s?: string | null) => {
            if (!s) return 0;
            const m = s.match(/(\d+)\s*x\s*(\d+)/i);
            return m ? Math.max(parseInt(m[1], 10), parseInt(m[2], 10)) : 0;
        };

        // Prefer 32, then 16, then any PNG, else first
        const scored = links.map(l => {
            const sizeStr = (l as any).sizes?.value || l.getAttribute("sizes") || "";
            const size = parseSize(sizeStr);
            const href = l.href || "";
            const isPng = /png/i.test(l.type || "") || /\.png(\?|$)/i.test(href) || href.startsWith("data:image/png");
            let score = 0;
            if (size === 32) score += 100;
            else if (size === 16) score += 80;
            else if (size > 0) score += 40;
            if (isPng) score += 10;
            return { href, score };
        });

        scored.sort((a, b) => b.score - a.score);
        return scored[0]?.href || null;
    }

    private createOrMoveIconLink(id: string, rel: string, type: string, sizes: string): HTMLLinkElement {
        let link = document.getElementById(id) as HTMLLinkElement | null;
        if (!link) {
            link = document.createElement("link");
            link.id = id;
            link.rel = rel;
            link.type = type;
            link.sizes = sizes;
            document.head.appendChild(link);
        } else {
            document.head.appendChild(link); // move to end
        }
        return link;
    }
}

/** Convenience initializer */
export const initFaviconHueRotator = (opts: FaviconHueRotatorOptions = {}) => {
    const instance = new FaviconHueRotator(opts);
    instance.init();
    return instance;
};
