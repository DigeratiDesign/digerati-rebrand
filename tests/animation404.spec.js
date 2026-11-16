import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const fixture = (host = true) => `<!doctype html><html><head><style>
  body { margin: 0; background: #2a2722; color: white; }
  section { height: 100vh; background: #2a2722; display: grid; place-items: center; }
  a { display: block; padding: 24px; color: white; }
</style></head><body><section><div><h1>404 Error</h1>
<a href="/">Resync with Reality</a></div>${host ? '<div dd-animation="404"></div>' : ''}
</section><script defer src="/assets/index.js"></script></body></html>`;

async function setup(page, { host = true } = {}) {
  const errors = [];
  const requests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => requests.push(request.url()));
  await page.route('http://404.test/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.startsWith('/assets/')) {
      return route.fulfill({
        contentType: 'application/javascript',
        body: readFileSync(`dist/${path.slice('/assets/'.length)}`),
      });
    }
    return route.fulfill({ contentType: 'text/html', body: fixture(host && path !== '/') });
  });
  await page.goto('http://404.test/nested/missing');
  return { errors, requests };
}

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
