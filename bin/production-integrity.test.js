import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

import {
  assertHalftoneBundle,
  assertProductionBundle,
  buildModeOptions,
  generateHalftoneBundle,
} from './production-integrity.js';

const root = fileURLToPath(new URL('../', import.meta.url));

async function vendorFixture(fixture) {
  await mkdir(join(fixture, 'vendor'));
  for (const name of ['breathing-halftone.pkgd.js', 'LICENSE.breathing-halftone']) {
    await writeFile(join(fixture, 'vendor', name), await readFile(join(root, 'vendor', name)));
  }
}

async function halftoneFixture() {
  const [source, license] = await Promise.all([
    readFile(join(root, 'vendor/breathing-halftone.pkgd.js'), 'utf8'),
    readFile(join(root, 'vendor/LICENSE.breathing-halftone'), 'utf8'),
  ]);
  return { source, license, ...(await generateHalftoneBundle(source, license)) };
}

async function bundle(production) {
  const result = await build({
    absWorkingDir: root,
    stdin: { contents: 'console.log(process.env.NODE_ENV)', sourcefile: 'fixture.js' },
    outfile: 'dist/index.js',
    bundle: true,
    write: false,
    ...buildModeOptions(production),
  });
  return {
    code: result.outputFiles.find((file) => file.path.endsWith('/index.js')).text,
    map: result.outputFiles.find((file) => file.path.endsWith('/index.js.map')).text,
  };
}

test('production builds exclude the development client and explicitly select production', async () => {
  const { code, map } = await bundle(true);
  assertProductionBundle(code, map);
  assert.match(code, /production/);
  assert.doesNotMatch(code, /development/);
  assert.equal(buildModeOptions(true).minify, true);
  assert.deepEqual(buildModeOptions(true).inject, []);
  assert.equal(buildModeOptions(true).define.SERVE_ORIGIN, undefined);
});

test('development builds retain the existing localhost live-reload client', async () => {
  const { code, map } = await bundle(false);
  assert.match(code, /http:\/\/localhost:3000/);
  assert.match(code, /EventSource/);
  assert.match(code, /\/esbuild/);
  assert.match(code, /location.reload\(\)/);
  assert.match(code, /development/);
  assert.throws(() => assertProductionBundle(code, map), /forbidden code/);
});

test('integrity guard rejects each development marker independently', async () => {
  const { code, map } = await bundle(true);
  for (const marker of [
    '"http://localhost:3000"',
    '"http://127.0.0.1:3000"',
    '"http://[::1]:3000"',
    '"/esbuild"',
    '// bin/live-reload.js',
    'new EventSource("/stream")',
    'location . reload ()',
  ]) {
    assert.throws(() => assertProductionBundle(`${marker};\n${code}`, map), /forbidden code/);
  }
});

test('integrity guard requires a linked map and rejects live-reload map sources', async () => {
  const { code, map } = await bundle(true);
  assert.throws(() => assertProductionBundle(code.replace('sourceMappingURL', 'unlinked'), map));
  const parsed = JSON.parse(map);
  parsed.sources[0] = '../bin/live-reload.js';
  assert.throws(() => assertProductionBundle(code, JSON.stringify(parsed)));
});

test('JavaScript-only production command creates both artifacts without changing CSS', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'digerati-build-test-'));
  try {
    await mkdir(join(fixture, 'src'));
    await mkdir(join(fixture, 'dist'));
    await vendorFixture(fixture);
    await writeFile(join(fixture, 'src/index.ts'), 'console.log(process.env.NODE_ENV);');
    await writeFile(join(fixture, 'dist/main.css'), '/* unrelated CSS */');
    const result = spawnSync(process.execPath, [join(root, 'bin/build.js'), '--javascript-only'], {
      cwd: fixture,
      env: { ...process.env, NODE_ENV: 'production' },
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr);
    assertProductionBundle(
      await readFile(join(fixture, 'dist/index.js'), 'utf8'),
      await readFile(join(fixture, 'dist/index.js.map'), 'utf8')
    );
    await assertHalftoneBundle(
      await readFile(join(fixture, 'dist/breathing-halftone.pkgd.js'), 'utf8'),
      await readFile(join(fixture, 'dist/breathing-halftone.pkgd.js.map'), 'utf8'),
      await readFile(join(fixture, 'vendor/breathing-halftone.pkgd.js'), 'utf8'),
      await readFile(join(fixture, 'vendor/LICENSE.breathing-halftone'), 'utf8')
    );
    assert.equal(await readFile(join(fixture, 'dist/main.css'), 'utf8'), '/* unrelated CSS */');
    await assert.rejects(readFile(join(fixture, 'dist/webflow-html-embed.css')));
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test('JavaScript-only command rejects development mode before writing or serving', () => {
  const result = spawnSync(process.execPath, [join(root, 'bin/build.js'), '--javascript-only'], {
    cwd: root,
    env: { ...process.env, NODE_ENV: 'development' },
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /requires NODE_ENV=production/);
});

test('halftone generation preserves the vendor source, global API and license in linked artifacts', async () => {
  const { code, map, source, license } = await halftoneFixture();
  await assertHalftoneBundle(code, map, source, license);
  assert.ok(Buffer.byteLength(code) < Buffer.byteLength(source));
  assert.match(code, /sourceMappingURL=breathing-halftone\.pkgd\.js\.map/);
  assert.match(code, /Breathing Halftone/);
  assert.ok(code.includes(license.trim()));
  const parsed = JSON.parse(map);
  assert.deepEqual(parsed.sources, ['../vendor/breathing-halftone.pkgd.js']);
  assert.deepEqual(parsed.sourcesContent, [source]);
  assert.ok(parsed.mappings.length);
});

test('halftone integrity rejects stale code, maps, source and stripped licensing', async () => {
  const { code, map, source, license } = await halftoneFixture();
  for (const [candidateCode, candidateMap, candidateSource] of [
    [source, map, source],
    [code, '{}', source],
    [code, map, `${source}\n// vendor update`],
    [code.replace(license.trim(), ''), map, source],
  ]) {
    await assert.rejects(
      assertHalftoneBundle(candidateCode, candidateMap, candidateSource, license)
    );
  }
  await assert.rejects(generateHalftoneBundle(source, ''), /MIT notice/);
});

test('halftone integrity detects a missing global constructor or required cleanup method', async () => {
  const { source, license } = await halftoneFixture();
  for (const broken of [
    source.replace('window.BreathingHalftone = Halftone;', ''),
    source.replace('Halftone.prototype.destroy =', 'Halftone.prototype.removedDestroy ='),
  ]) {
    const { code, map } = await generateHalftoneBundle(broken, license);
    await assert.rejects(assertHalftoneBundle(code, map, broken, license), /missing/);
  }
});

test('failed halftone generation removes stale artifacts and leaves unrelated CSS intact', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'digerati-halftone-failure-'));
  try {
    await mkdir(join(fixture, 'src'));
    await mkdir(join(fixture, 'dist'));
    await vendorFixture(fixture);
    await writeFile(join(fixture, 'src/index.ts'), 'console.log("fixture");');
    await writeFile(join(fixture, 'vendor/breathing-halftone.pkgd.js'), 'invalid JavaScript !!!');
    await writeFile(join(fixture, 'dist/breathing-halftone.pkgd.js'), 'stale bundle');
    await writeFile(join(fixture, 'dist/breathing-halftone.pkgd.js.map'), 'stale map');
    await writeFile(join(fixture, 'dist/main.css'), '/* preserve */');
    const result = spawnSync(process.execPath, [join(root, 'bin/build.js'), '--javascript-only'], {
      cwd: fixture,
      env: { ...process.env, NODE_ENV: 'production' },
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0);
    await assert.rejects(readFile(join(fixture, 'dist/breathing-halftone.pkgd.js')));
    await assert.rejects(readFile(join(fixture, 'dist/breathing-halftone.pkgd.js.map')));
    assert.equal(await readFile(join(fixture, 'dist/main.css'), 'utf8'), '/* preserve */');
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
