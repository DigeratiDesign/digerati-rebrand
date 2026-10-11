import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

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
  const [code, map] = await Promise.all([
    readFile('dist/index.js', 'utf8'),
    readFile('dist/index.js.map', 'utf8'),
  ]);
  assertProductionBundle(code, map);
  console.log('Production JavaScript integrity check passed');
}
