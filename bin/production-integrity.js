import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';

import { build } from 'esbuild';

export async function generateHalftoneBundle(source, license) {
  if (
    !license.includes('David DeSandro') ||
    !license.includes('Permission is hereby granted') ||
    !license.includes('The above copyright notice') ||
    !license.includes('THE SOFTWARE IS PROVIDED "AS IS"')
  ) {
    throw new Error('Breathing Halftone requires its upstream MIT notice');
  }
  const { outputFiles } = await build({
    stdin: { contents: source, sourcefile: '../vendor/breathing-halftone.pkgd.js' },
    outfile: 'dist/breathing-halftone.pkgd.js',
    write: false,
    minify: true,
    target: 'es5',
    sourcemap: 'linked',
    legalComments: 'inline',
    banner: { js: `/*!\n${license.trim()}\n*/` },
  });
  return {
    code: outputFiles.find((file) => file.path.endsWith('/breathing-halftone.pkgd.js')).text,
    map: outputFiles.find((file) => file.path.endsWith('/breathing-halftone.pkgd.js.map')).text,
  };
}

function halftoneAPI(code) {
  const window = { requestAnimationFrame() {}, cancelAnimationFrame() {} };
  runInNewContext(
    code,
    { window, document: { createElement: () => ({ getContext: () => null }) } },
    {
      timeout: 1000,
    }
  );
  const Constructor = window.BreathingHalftone;
  if (typeof Constructor !== 'function') throw new Error('BreathingHalftone global is missing');
  for (const method of ['destroy', 'animate', 'render', 'bindEvents', 'unbindEvents']) {
    if (typeof Constructor.prototype[method] !== 'function') {
      throw new Error(`BreathingHalftone.${method} is missing`);
    }
  }
  const instance = new Constructor({}, { dotSize: 0.1 });
  if (instance.options.dotSize !== 0.1) throw new Error('BreathingHalftone options changed');
  return JSON.stringify({
    methods: Object.getOwnPropertyNames(Constructor.prototype).sort(),
    statics: Object.keys(Constructor).sort(),
    vector: Object.getOwnPropertyNames(Constructor.Vector.prototype).sort(),
    particle: Object.getOwnPropertyNames(Constructor.Particle.prototype).sort(),
    defaults: Constructor.defaults,
  });
}

export async function assertHalftoneBundle(code, map, source, license) {
  const expected = await generateHalftoneBundle(source, license);
  if (code !== expected.code || map !== expected.map) {
    throw new Error(
      'Breathing Halftone artifacts do not match the maintained vendor source and license'
    );
  }
  if (!code.includes('Breathing Halftone') || !code.includes(license.trim())) {
    throw new Error('Breathing Halftone attribution or MIT notice is missing');
  }
  if (halftoneAPI(code) !== halftoneAPI(source)) {
    throw new Error('Breathing Halftone public API changed');
  }
}

export function buildModeOptions(production) {
  return {
    minify: production,
    sourcemap: 'linked',
    target: production ? 'es2020' : 'esnext',
    inject: production ? [] : ['./bin/live-reload.js'],
    define: {
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      ...(production ? {} : { SERVE_ORIGIN: JSON.stringify('http://localhost:3000') }),
    },
  };
}

export function assertProductionBundle(code, mapText) {
  const forbidden = [
    /https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?=[:/"'`\s]|$)/i,
    /\/esbuild\b/,
    /bin\/live-reload\.js/,
    /\bEventSource\b/,
    /\blocation\s*\.\s*reload\s*\(/,
  ];
  for (const pattern of forbidden) {
    if (pattern.test(code))
      throw new Error(`Production bundle contains forbidden code: ${pattern}`);
  }

  const map = JSON.parse(mapText);
  if (
    map.version !== 3 ||
    !Array.isArray(map.sources) ||
    !Array.isArray(map.sourcesContent) ||
    map.sources.length !== map.sourcesContent.length ||
    typeof map.mappings !== 'string' ||
    !map.mappings.length ||
    map.sources.some((source) => /(?:^|\/)bin\/live-reload\.js$/.test(source)) ||
    !/\/\/# sourceMappingURL=index\.js\.map\s*$/.test(code)
  ) {
    throw new Error('Production bundle must have a linked source map without live-reload sources');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [code, map, halftoneCode, halftoneMap, source, license] = await Promise.all([
    readFile('dist/index.js', 'utf8'),
    readFile('dist/index.js.map', 'utf8'),
    readFile('dist/breathing-halftone.pkgd.js', 'utf8'),
    readFile('dist/breathing-halftone.pkgd.js.map', 'utf8'),
    readFile('vendor/breathing-halftone.pkgd.js', 'utf8'),
    readFile('vendor/LICENSE.breathing-halftone', 'utf8'),
  ]);
  assertProductionBundle(code, map);
  await assertHalftoneBundle(halftoneCode, halftoneMap, source, license);
  console.log('Production JavaScript integrity check passed');
}
