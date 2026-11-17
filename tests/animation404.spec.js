import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Mirrors the Webflow page transition: the dot preloader defaults to display: block,
// and on window load Webflow fades it out over 500ms, then sets display: none.
const preloaderMarkup = `<div dd-fx="preloader" class="preloader"
  style="position: fixed; inset: 0; z-index: 10; display: block; background: #2a2722"></div>
<script>
  addEventListener('load', () => {
    const preloader = document.querySelector('[dd-fx="preloader"]');
    preloader.style.transition = 'opacity 500ms ease';
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      window.__timeline.preloaderHidden = performance.now();
    }, 500);
  });
</script>`;

const fixture = ({ host = true, preloader = false, slowAsset = false } = {}) =>
  `<!doctype html><html><head><style>
  body { margin: 0; background: #2a2722; color: white; }
  section { height: 100vh; background: #2a2722; display: grid; place-items: center; }
  a { display: block; padding: 24px; color: white; }
</style></head><body>${preloader ? preloaderMarkup : ''}<section><div><h1>404 Error</h1>
<a href="/">Resync with Reality</a></div>${host ? '<div dd-animation="404"></div>' : ''}
</section>${slowAsset ? '<img src="/slow.gif" alt="">' : ''}
<script defer src="/assets/index.js"></script></body></html>`;

// Records when the host first becomes visible (its pending class is removed).
const recordReveal = () => {
  window.__timeline = {};
  new MutationObserver(() => {
    const host = document.querySelector('[dd-animation="404"]');
    if (!host || window.__timeline.revealed) return;
    if (host.classList.contains('dd-404-animation-pending')) window.__timeline.pendingSeen = true;
    else if (window.__timeline.pendingSeen) window.__timeline.revealed = performance.now();
  }).observe(document, { subtree: true, attributes: true, attributeFilter: ['class'] });
};

async function setup(
  page,
  { host = true, preloader = false, slowAssetMs = 0, moduleDelayMs = 0, waitUntil = 'load' } = {}
) {
  const errors = [];
  const requests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => requests.push(request.url()));
  await page.addInitScript(recordReveal);
  await page.route('http://404.test/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path === '/slow.gif') {
      await new Promise((resolve) => setTimeout(resolve, slowAssetMs));
      return route.fulfill({
        contentType: 'image/gif',
        body: Buffer.from('R0lGODlhAQABAAAAACw=', 'base64'),
      });
    }
    if (path.startsWith('/assets/')) {
      if (path.endsWith('/animation404.js') && moduleDelayMs) {
        await new Promise((resolve) => setTimeout(resolve, moduleDelayMs));
      }
      return route.fulfill({
        contentType: 'application/javascript',
        body: readFileSync(`dist/${path.slice('/assets/'.length)}`),
      });
    }
    return route.fulfill({
      contentType: 'text/html',
      body: fixture({ host: host && path !== '/', preloader, slowAsset: slowAssetMs > 0 }),
    });
  });
  await page.goto('http://404.test/nested/missing', { waitUntil });
  return { errors, requests };
}

const timeline = (page) => page.evaluate(() => window.__timeline);

test('shared entry mounts once, fills the section, and leaves the return link clickable', async ({
  page,
}) => {
  const { errors, requests } = await setup(page);
  const canvas = page.locator('[dd-animation="404"] > canvas');
  await expect(canvas).toHaveCount(1);
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(1);
  expect(await canvas.boundingBox()).toEqual(await page.locator('section').boundingBox());
  // Reuse the actual lazy module, including the root-element initialization path.
  await page.evaluate(async () => {
    const { init404Animation } = await import('/assets/animation404.js');
    init404Animation();
    init404Animation(document.querySelector('[dd-animation="404"]'));
  });
  await expect(canvas).toHaveCount(1);
  expect(requests.filter((url) => url.endsWith('/animation404.js'))).toHaveLength(1);
  await page.getByRole('link', { name: 'Resync with Reality' }).click();
  await expect(page).toHaveURL('http://404.test/');
  expect(errors).toEqual([]);
});

test('return link can be reached and activated with the keyboard', async ({ page }) => {
  await setup(page);
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Resync with Reality' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('http://404.test/');
});

test('pointer movement has no listeners or effect on the animation', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Listener inspection uses the Chrome DevTools Protocol');
  const { errors } = await setup(page);
  await expect(page.locator('canvas')).toHaveCount(1);
  const client = await page.context().newCDPSession(page);
  const listenerTypes = async (expression) => {
    const { result } = await client.send('Runtime.evaluate', { expression });
    const { listeners } = await client.send('DOMDebugger.getEventListeners', {
      objectId: result.objectId,
    });
    return listeners.map(({ type }) => type);
  };
  const pointerish = /^(pointer|mouse)/;
  for (const target of ['window', 'document.querySelector("section")']) {
    expect((await listenerTypes(target)).filter((type) => pointerish.test(type))).toEqual([]);
  }
  const box = await page.locator('section').boundingBox();
  for (let i = 0; i <= 20; i++) {
    await page.mouse.move(box.x + (box.width * i) / 20, box.y + box.height / 2);
  }
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('slow load: stays hidden and paused until the last transition dot clears', async ({
  page,
}) => {
  const { errors } = await setup(page, {
    preloader: true,
    slowAssetMs: 2500,
    waitUntil: 'domcontentloaded',
  });
  const host = page.locator('[dd-animation="404"]');
  // Mounted and prepared behind the transition, but hidden and not running.
  await expect(host.locator('canvas')).toHaveCount(1);
  await expect(host).toHaveClass(/dd-404-animation-pending/);
  await expect(host).toHaveCSS('visibility', 'hidden');
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(0);

  await page.waitForFunction(() => window.__timeline.revealed, null, { timeout: 10_000 });
  const { preloaderHidden, revealed } = await timeline(page);
  expect(revealed).toBeGreaterThanOrEqual(preloaderHidden);
  expect(revealed - preloaderHidden).toBeLessThan(250);
  await expect(host).toHaveCSS('visibility', 'visible');
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(1);

  // Repeated initialisation neither remounts nor replays the entrance.
  await page.evaluate(async () => {
    const { init404Animation } = await import('/assets/animation404.js');
    init404Animation();
  });
  await expect(host.locator('canvas')).toHaveCount(1);
  await expect(host).not.toHaveClass(/dd-404-animation-pending/);
  expect(errors).toEqual([]);
});

test('warm load: reveals at once when the module arrives after the transition', async ({
  page,
}) => {
  const { errors } = await setup(page, { preloader: true, moduleDelayMs: 1500 });
  await page.waitForFunction(() => window.__timeline.preloaderHidden);
  await page.waitForFunction(() => window.__timeline.revealed, null, { timeout: 10_000 });
  const { preloaderHidden, revealed } = await timeline(page);
  // The transition cleared ~500ms after load; the module only arrived ~1.5s in.
  expect(revealed - preloaderHidden).toBeGreaterThan(500);
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('reduced motion reveals at rest once the transition clears', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const { errors } = await setup(page, {
    preloader: true,
    slowAssetMs: 1500,
    waitUntil: 'domcontentloaded',
  });
  const host = page.locator('[dd-animation="404"]');
  await expect(host).toHaveClass(/dd-404-animation-pending/);
  await page.waitForFunction(() => window.__timeline.revealed, null, { timeout: 10_000 });
  const { preloaderHidden, revealed } = await timeline(page);
  expect(revealed).toBeGreaterThanOrEqual(preloaderHidden);
  await expect(host).toHaveCSS('visibility', 'visible');
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('reduced motion starts paused and responds to preference changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const { errors } = await setup(page);
  await expect(page.locator('canvas')).toHaveCount(1);
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(0);
  expect(
    await page
      .locator('[dd-animation="404"]')
      .evaluate((host) => getComputedStyle(host).animationPlayState)
  ).toBe('paused');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.dd-404-animation-playing')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('ordinary pages never request the animation or load Three.js', async ({ page }) => {
  const { errors, requests } = await setup(page, { host: false });
  // Wait for all shared DOM-ready tasks, then inspect the actual network requests.
  await page.waitForLoadState('networkidle');
  expect(requests.some((url) => /animation404|three/i.test(url))).toBe(false);
  expect(await page.evaluate(() => window.__THREE__)).toBeUndefined();
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(errors).toEqual([]);
});
