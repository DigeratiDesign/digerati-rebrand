import { expect, test } from '@playwright/test';
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let moduleCode;
const events = ['init', 'initialized', 'enter', 'exit', 'destroyed', 'error'];

test.beforeAll(async () => {
  const { outputFiles } = await build({
    stdin: {
      contents: `
        import { testimonialAvatar } from './src/client/modules/testimonialAvatar';
        import { handleReducedMotion } from './src/digerati/accessibility/reducedMotion';
        import { eventBus } from './src/digerati/events';
        window.testInit = testimonialAvatar;
        ${JSON.stringify(events)}.forEach(name => eventBus.on('testimonialAvatar:' + name,
          payload => window.testEvents.push({ name, payload })));
        handleReducedMotion();
      `,
      resolveDir: resolve('.'),
    },
    bundle: true,
    write: false,
    format: 'iife',
    target: 'es2020',
  });
  moduleCode = outputFiles[0].text;
});

async function setup(
  page,
  {
    reduced = false,
    safari = false,
    host = 'digerati.test',
    real = false,
    missing = false,
    throws = false,
    caseStudy = false,
    missingWrapper = false,
  } = {}
) {
  await page.setViewportSize({ width: 1000, height: 700 });
  await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
  await page.route(`http://${host}/`, (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: `<style>body{margin:0;height:3000px}.testimonial_half-tone-wrapper,.home_case-study_half-tone-wrapper{position:absolute;left:40px;width:27.5rem;height:27.5rem;overflow:hidden}.testimonial_half-tone{position:absolute;top:1.25rem;left:1.25rem;width:25rem;height:25rem}#a-wrapper{top:100px}#b-wrapper{top:1100px}</style>
      <div id="a-wrapper" class="${missingWrapper ? 'unrecognized-wrapper' : caseStudy ? 'home_case-study_half-tone-wrapper' : 'testimonial_half-tone-wrapper'}"><img id="a" class="testimonial_half-tone" alt="first"></div>
      <div id="b-wrapper" class="testimonial_half-tone-wrapper"><img id="b" class="testimonial_half-tone" alt="second"></div>`,
    })
  );
  await page.goto(`http://${host}/`);
  await page.evaluate(
    async ({ safari, missing, throws }) => {
      window.testEvents = [];
      window.testObserverCount = 0;
      window.testObservedTargets = [];
      const NativeObserver = window.IntersectionObserver;
      window.IntersectionObserver = class extends NativeObserver {
        constructor(callback, options) {
          super(callback, options);
          window.testObserverCount++;
        }
        observe(target) {
          window.testObservedTargets.push(target.id);
          super.observe(target);
        }
      };
      window.testInstances = [];
      window.Webflow = { require: () => ({ destroy() {}, init() {} }) };
      if (safari) {
        Object.defineProperty(navigator, 'userAgent', {
          get: () => 'Version/17.0 Mobile Safari/605.1.15',
        });
        Object.defineProperty(navigator, 'vendor', { get: () => 'Apple Computer, Inc.' });
      }
      const source = document.createElement('canvas');
      source.width = source.height = 100;
      source.getContext('2d').fillRect(0, 0, 100, 100);
      await Promise.all(
        [...document.images].map(async (img) => {
          img.src = source.toDataURL();
          await img.decode();
        })
      );
      if (!missing)
        window.BreathingHalftone = class {
          constructor(img, options) {
            if (throws) throw new Error('fixture constructor failure');
            this.img = img;
            this.options = options;
            this.destroyCalls = 0;
            window.testInstances.push(this);
          }
          destroy() {
            this.destroyCalls++;
          }
        };
    },
    { safari, missing, throws }
  );
  if (real)
    await page.addScriptTag({
      content: readFileSync(resolve('dist/breathing-halftone.pkgd.js'), 'utf8'),
    });
  await page.addScriptTag({ content: moduleCode });
  await page.evaluate(() => window.testInit());
}

const active = (page) => page.evaluate(() => [...document.images].map((img) => !!img._halftone));
const eventNames = (page) => page.evaluate(() => window.testEvents.map((event) => event.name));

test('initial visibility starts only the visible avatar with the existing options and events', async ({
  page,
}) => {
  await setup(page);
  await expect.poll(() => active(page)).toEqual([true, false]);
  expect(await eventNames(page)).toEqual(['init', 'initialized', 'enter']);
  expect(await page.evaluate(() => window.testInstances[0].options)).toMatchObject({
    dotSize: 1 / 70,
    channels: ['lum'],
    isAdditive: false,
  });
  expect(await page.evaluate(() => window.testEvents[1].payload)).toEqual({ count: 2 });
  expect(await page.evaluate(() => window.testEvents[2].payload)).toEqual({ alt: 'first' });
});

test('entry, exit and three re-entry cycles destroy old instances and emit events', async ({
  page,
}) => {
  await setup(page);
  await expect.poll(() => active(page)).toEqual([true, false]);
  for (let cycle = 0; cycle < 3; cycle++) {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect.poll(() => active(page)).toEqual([false, true]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => active(page)).toEqual([true, false]);
  }
  expect(
    await page.evaluate(() => window.testInstances.map((instance) => instance.destroyCalls))
  ).toEqual([1, 1, 1, 1, 1, 1, 0]);
  expect((await eventNames(page)).filter((name) => name === 'destroyed')).toHaveLength(6);
  expect((await eventNames(page)).filter((name) => name === 'exit')).toHaveLength(6);
  expect((await eventNames(page)).filter((name) => name === 'error')).toHaveLength(0);
});

test('repeated initialization and resizing do not create duplicate instances', async ({ page }) => {
  await setup(page);
  await expect.poll(() => active(page)).toEqual([true, false]);
  await page.evaluate(async () => {
    await window.testInit();
    await window.testInit();
  });
  await page.setViewportSize({ width: 900, height: 700 });
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => window.testInstances.length)).toBe(1);
  expect((await eventNames(page)).filter((name) => name === 'initialized')).toHaveLength(1);
  expect(await page.evaluate(() => window.testObserverCount)).toBe(1);
});

test('multiple images initialize and clean up independently', async ({ page }) => {
  await setup(page);
  await page.evaluate(() => (document.getElementById('b-wrapper').style.top = '260px'));
  await expect.poll(() => active(page)).toEqual([true, true]);
  await page.evaluate(() => (document.getElementById('a-wrapper').style.top = '1700px'));
  await expect.poll(() => active(page)).toEqual([false, true]);
  expect(
    await page.evaluate(() => window.testInstances.map((instance) => instance.destroyCalls))
  ).toEqual([1, 0]);
});

test('viewport resizing and layout movement trigger entry and exit without refresh calls', async ({
  page,
}) => {
  await setup(page);
  await page.evaluate(() => (document.getElementById('b-wrapper').style.top = '750px'));
  await page.setViewportSize({ width: 1000, height: 900 });
  await expect.poll(() => active(page)).toEqual([true, true]);
  await page.setViewportSize({ width: 1000, height: 650 });
  await expect.poll(() => active(page)).toEqual([true, false]);
  await page.evaluate(() => (document.getElementById('b-wrapper').style.top = '250px'));
  await expect.poll(() => active(page)).toEqual([true, true]);
});

test('reduced motion skips observers and constructor allocation', async ({ page }) => {
  await setup(page, { reduced: true });
  expect(await active(page)).toEqual([false, false]);
  expect(await page.evaluate(() => window.testInstances.length)).toBe(0);
  expect(await eventNames(page)).toEqual(['init', 'exit']);
  expect(await page.evaluate(() => window.testObserverCount)).toBe(0);
});

test('Safari localhost skip remains while deployed Safari may initialize', async ({ page }) => {
  await setup(page, { safari: true, host: 'localhost' });
  expect(await eventNames(page)).toEqual(['init', 'exit']);
  expect(await active(page)).toEqual([false, false]);
  await setup(page, { safari: true });
  await expect.poll(() => active(page)).toEqual([true, false]);
});

for (const failure of ['missing', 'throws'])
  test(`constructor ${failure} reports an error without a false enter event`, async ({ page }) => {
    await setup(page, { [failure]: true });
    await expect.poll(async () => (await eventNames(page)).includes('error')).toBe(true);
    expect(await active(page)).toEqual([false, false]);
    expect((await eventNames(page)).includes('enter')).toBe(false);
  });

test('pagehide cleanup blocks queued entry and back-cache restoration reobserves', async ({
  page,
}) => {
  await setup(page);
  await expect.poll(() => active(page)).toEqual([true, false]);
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }))
  );
  await expect.poll(() => active(page)).toEqual([false, false]);
  await page.evaluate(() => (document.getElementById('b-wrapper').style.top = '250px'));
  await page.waitForTimeout(100);
  expect(await active(page)).toEqual([false, false]);
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }))
  );
  await expect.poll(() => active(page)).toEqual([true, true]);
});

test('generated vendor bundle creates one canvas per image and removes it on exit and re-entry', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await setup(page, { real: true });
  await expect.poll(() => page.locator('canvas').count()).toBe(1);
  for (let cycle = 0; cycle < 3; cycle++) {
    await page.evaluate(() => window.scrollTo(0, 1800));
    await expect.poll(() => page.locator('canvas').count()).toBe(0);
    await expect.poll(() => active(page)).toEqual([false, false]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => active(page)).toEqual([true, false]);
    await expect.poll(() => page.locator('canvas').count()).toBe(1);
  }
  expect(errors).toEqual([]);
});

for (const caseStudy of [false, true])
  test(`real halftone stays stationary after hiding its image (${caseStudy ? 'case study' : 'testimonial'})`, async ({
    page,
  }) => {
    await setup(page, { real: true, caseStudy });
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.getElementById('a')).display))
      .toBe('none');
    await expect.poll(() => page.locator('canvas').count()).toBe(1);
    const bounds = await page.locator('#a-wrapper').boundingBox();
    await page.evaluate(() => {
      window.firstCanvas = document.querySelector('canvas');
      window.firstInstance = document.getElementById('a')._halftone;
    });
    await page.waitForTimeout(1000);
    expect((await eventNames(page)).filter((name) => name === 'enter')).toHaveLength(1);
    expect((await eventNames(page)).filter((name) => name === 'destroyed')).toHaveLength(0);
    expect(
      await page.evaluate(
        () =>
          document.querySelector('canvas') === window.firstCanvas &&
          document.getElementById('a')._halftone === window.firstInstance
      )
    ).toBe(true);
    expect(await page.locator('#a-wrapper').boundingBox()).toEqual(bounds);
    await expect(page.locator('canvas')).toBeVisible();
    expect(await page.locator('#a').boundingBox()).toBeNull();
    await page.evaluate(() => window.scrollTo(0, 1800));
    await expect.poll(() => page.locator('canvas').count()).toBe(0);
    await expect.poll(() => active(page)).toEqual([false, false]);
    expect(
      await page.evaluate(() => getComputedStyle(document.getElementById('a')).display)
    ).not.toBe('none');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.getElementById('a')).display))
      .toBe('none');
    await page.waitForTimeout(500);
    expect((await eventNames(page)).filter((name) => name === 'enter')).toHaveLength(2);
    expect((await eventNames(page)).filter((name) => name === 'destroyed')).toHaveLength(1);
    await expect(page.locator('canvas')).toHaveCount(1);
    await expect(page.locator('canvas')).toBeVisible();
  });

test('real halftone images hide independently without moving their observed containers', async ({
  page,
}) => {
  await setup(page, { real: true });
  await page.evaluate(() => (document.getElementById('b-wrapper').style.top = '250px'));
  await expect
    .poll(() =>
      page.evaluate(() => [...document.images].map((img) => getComputedStyle(img).display))
    )
    .toEqual(['none', 'none']);
  await page.waitForTimeout(1000);
  expect((await eventNames(page)).filter((name) => name === 'enter')).toHaveLength(2);
  expect((await eventNames(page)).filter((name) => name === 'destroyed')).toHaveLength(0);
  await expect(page.locator('#a-wrapper canvas')).toHaveCount(1);
  await expect(page.locator('#b-wrapper canvas')).toHaveCount(1);
  await page.evaluate(() => (document.getElementById('a-wrapper').style.top = '1900px'));
  await expect.poll(() => active(page)).toEqual([false, true]);
  await expect(page.locator('#a-wrapper canvas')).toHaveCount(0);
  await expect(page.locator('#b-wrapper canvas')).toHaveCount(1);
  await page.evaluate(() => (document.getElementById('a-wrapper').style.top = '100px'));
  await expect.poll(() => page.locator('canvas').count()).toBe(2);
  await page.waitForTimeout(500);
  expect((await eventNames(page)).filter((name) => name === 'enter')).toHaveLength(3);
  expect((await eventNames(page)).filter((name) => name === 'destroyed')).toHaveLength(1);
});

test('missing wrapper reports a production-visible error and skips that image without a fallback observer', async ({
  page,
}) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await setup(page, { missingWrapper: true });
  await page.waitForTimeout(100);
  expect(await active(page)).toEqual([false, false]);
  expect(await page.evaluate(() => window.testInstances.length)).toBe(0);
  expect(await page.evaluate(() => window.testObservedTargets)).toEqual(['b-wrapper']);
  expect(
    await page.evaluate(() => window.testEvents.filter((event) => event.name === 'error'))
  ).toEqual([{ name: 'error', payload: { message: 'missing-wrapper', alt: 'first' } }]);
  expect(
    errors.some(
      (message) =>
        message.includes('No stable halftone wrapper found for') && message.includes('first')
    )
  ).toBe(true);
});
