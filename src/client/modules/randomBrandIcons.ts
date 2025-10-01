// src/client/modules/randomBrandIcons.ts
type PersistMode = 'none' | 'session' | 'local';

type Opts = {
    persist?: PersistMode;            // keep the chosen colour across reloads
    cacheBust?: boolean;              // add ?v= to break stale icon cache on first set
    cycle?: boolean | { periodMs?: number; startIndex?: number }; // rotate icons
};

const WEBCLIPS = [
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee20abb221aac7100b_webclip-lime.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3deee1f52f94003ada39_webclip-cyan.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee26b8a2d759ffade5_webclip-blue.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3deef50650b0cc1be54c_webclip-magenta.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee3f769011bff948ed_webclip-purple.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee783d9414828cbe28_webclip-red.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3deeceddc45649cdd071_webclip-orange.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee08796ff62bc90b76_webclip-yellow.png",
] as const;

const FAVICONS = [
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee1cfcb7705f55ff66_favicon-lime.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3deee7f210e1dfcbe98d_favicon-cyan.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee72708fb3fc43c9c1_favicon-blue.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee6f1f196527dd2a91_favicon-magenta.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3deee3e0d998a4f24031_favicon-purple.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee8cac332627673aa0_favicon-red.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3deebd825fd2bbf53693_favicon-orange.png",
    "https://cdn.prod.website-files.com/68d7c80eb8c20fa843863320/68dd3dee5984e99bd3856b42_favicon-yellow.png",
] as const;

let cycleTimer: number | null = null;

export function initRandomBrandIcons(opts: Opts = {}): void {
    const {
        persist = 'none',
        cacheBust = true,
        cycle = false,
    } = opts;

    const cycleCfg = typeof cycle === 'object' ? cycle : {};
    const totalPeriodMs = cycle ? (cycleCfg.periodMs ?? 12000) : 0;

    // Preload all once (best effort)
    [...WEBCLIPS, ...FAVICONS].forEach(src => { const i = new Image(); i.src = src; });

    // Find / create the link elements once
    const links = ensureIconLinks();

    // Choose starting index
    const store = getStore(persist);
    const key = 'brandIconIndex';
    const persisted = store?.getItem(key);
    let index =
        typeof cycleCfg.startIndex === 'number'
            ? clampIndex(cycleCfg.startIndex)
            : persisted != null && !Number.isNaN(+persisted)
                ? clampIndex(+persisted)
                : Math.floor(Math.random() * FAVICONS.length);

    // First paint
    applyIndex(index, links, cacheBust);

    // Persist current selection
    if (store) store.setItem(key, String(index));

    // Any existing timer? Clear it
    if (cycleTimer != null) {
        clearInterval(cycleTimer);
        cycleTimer = null;
    }

    // Start cycling if requested
    if (cycle && totalPeriodMs > 0) {
        const stepMs = Math.max(16, Math.floor(totalPeriodMs / FAVICONS.length));
        cycleTimer = window.setInterval(() => {
            index = (index + 1) % FAVICONS.length;
            applyIndex(index, links, /*cacheBust*/ false);
            if (store) store.setItem(key, String(index));
        }, stepMs);
    }

    // Expose tiny debug API
    (window as any).__brandIcons = {
        set(i: number) { index = clampIndex(i); applyIndex(index, links, false); if (store) store.setItem(key, String(index)); },
        stop() { if (cycleTimer != null) { clearInterval(cycleTimer); cycleTimer = null; } },
        start(ms = totalPeriodMs || 12000) {
            if (cycleTimer != null) return;
            const stepMs = Math.max(16, Math.floor(ms / FAVICONS.length));
            cycleTimer = window.setInterval(() => {
                index = (index + 1) % FAVICONS.length;
                applyIndex(index, links, false);
                if (store) store.setItem(key, String(index));
            }, stepMs);
        },
        index: () => index,
    };
}

// --- helpers ---------------------------------------------------------------

function clampIndex(i: number) {
    const len = FAVICONS.length;
    return ((i % len) + len) % len;
}

function getStore(mode: PersistMode) {
    try {
        return mode === 'local' ? localStorage
            : mode === 'session' ? sessionStorage
                : null;
    } catch {
        return null;
    }
}

function ensureIconLinks() {
    const ensure = (rel: string, sizes?: string, type = 'image/png') => {
        let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${sizes ? `[sizes="${sizes}"]` : ''}`);
        if (!link) {
            link = document.createElement('link');
            link.rel = rel;
            if (sizes) link.sizes = sizes;
            if (type) link.type = type;
            document.head.appendChild(link);
        }
        return link;
    };
    return {
        fav16: ensure('icon', '16x16'),
        fav32: ensure('icon', '32x32'),
        favShortcut: ensure('shortcut icon'),
        apple: ensure('apple-touch-icon', '256x256'),
    };
}

function applyIndex(index: number, links: ReturnType<typeof ensureIconLinks>, cacheBust: boolean) {
    const bust = cacheBust ? `?v=${Date.now().toString(36)}` : '';
    const fav = FAVICONS[index] + bust;
    const clip = WEBCLIPS[index] + bust;

    links.fav16.href = fav;
    links.fav32.href = fav;
    links.favShortcut.href = fav;
    links.apple.href = clip;
}
