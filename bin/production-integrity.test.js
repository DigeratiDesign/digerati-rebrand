import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

import { assertProductionBundle, buildModeOptions } from './production-integrity.js';

const root = fileURLToPath(new URL('../', import.meta.url));

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
