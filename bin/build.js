#!/usr/bin/env node

import * as esbuild from 'esbuild';
import less from 'less';
import { promises as fs } from 'fs';
import { readdirSync } from 'fs';
import { join, sep } from 'path';
import {
  assertHalftoneBundle,
  assertProductionBundle,
  buildModeOptions,
  generateHalftoneBundle,
} from './production-integrity.js';

// Inline LESS plugin for esbuild
const inlineLessPlugin = {
  name: 'inline-less',
  setup(build) {
    build.onLoad({ filter: /\.less$/ }, async (args) => {
      console.log('Compiling LESS file:', args.path);
      const source = await fs.readFile(args.path, 'utf8');
      try {
        const { css } = await less.render(source, {
          filename: args.path,
          javascriptEnabled: true,
          compress: true,
          paths: ['src/digerati/styles', 'src/client/styles'],
        });
        return { contents: css, loader: 'css' };
      } catch (error) {
        console.error(`LESS Compilation error in file: ${args.path}`, error);
        throw error;
      }
    });
  },
};

// Config
const BUILD_DIR = 'dist';
const PRODUCTION = process.env.NODE_ENV === 'production';
const JAVASCRIPT_ONLY = process.argv.includes('--javascript-only');
if (JAVASCRIPT_ONLY && !PRODUCTION) {
  throw new Error('--javascript-only requires NODE_ENV=production');
}
const ENTRY_POINTS = JAVASCRIPT_ONLY ? ['src/index.ts'] : ['src/index.ts', 'src/main.less'];
const SERVE_PORT = 3000;
const SERVE_ORIGIN = `http://localhost:${SERVE_PORT}`;

// A failed production build must not leave an old vendor artifact looking current.
let halftone;
if (PRODUCTION) {
  await Promise.all([
    fs.rm(`${BUILD_DIR}/breathing-halftone.pkgd.js`, { force: true }),
    fs.rm(`${BUILD_DIR}/breathing-halftone.pkgd.js.map`, { force: true }),
  ]);
  const [source, license] = await Promise.all([
    fs.readFile('vendor/breathing-halftone.pkgd.js', 'utf8'),
    fs.readFile('vendor/LICENSE.breathing-halftone', 'utf8'),
  ]);
  halftone = await generateHalftoneBundle(source, license);
  await assertHalftoneBundle(halftone.code, halftone.map, source, license);
}

// Delete old webflow-html-embed.css in dev
if (!PRODUCTION) {
  try {
    await fs.unlink(`${BUILD_DIR}/webflow-html-embed.css`);
    console.log('🗑 Removed old webflow-html-embed.css (dev mode)');
  } catch {
    // ignore if not found
  }
}

// Create esbuild context
const ctx = await esbuild.context({
  bundle: true,
  entryPoints: ENTRY_POINTS,
  outdir: BUILD_DIR,
  entryNames: '[name]',
  assetNames: 'assets/[name]',
  loader: { '.css': 'css' },
  ...buildModeOptions(PRODUCTION),
  write: !PRODUCTION,
  plugins: [inlineLessPlugin],
});

// Production build logic
if (PRODUCTION) {
  try {
    const { outputFiles } = await ctx.rebuild();
    const code = outputFiles.find((file) => file.path.endsWith('/index.js'));
    const map = outputFiles.find((file) => file.path.endsWith('/index.js.map'));
    assertProductionBundle(code.text, map.text);
    await fs.mkdir(BUILD_DIR, { recursive: true });
    for (const file of outputFiles) {
      await fs.mkdir(join(file.path, '..'), { recursive: true });
      await fs.writeFile(file.path, file.contents);
    }
    await fs.writeFile(`${BUILD_DIR}/breathing-halftone.pkgd.js`, halftone.code);
    await fs.writeFile(`${BUILD_DIR}/breathing-halftone.pkgd.js.map`, halftone.map);

    if (JAVASCRIPT_ONLY) {
      console.log('✅ Production JavaScript and source map written; CSS left untouched');
    } else {
      // Manually compile src/main.less for Webflow embed
      const lessSource = await fs.readFile('src/main.less', 'utf8');
      const { css } = await less.render(lessSource, {
        filename: 'src/main.less',
        javascriptEnabled: true,
        compress: true,
        paths: ['src/digerati/styles', 'src/client/styles'],
      });

      await fs.mkdir(BUILD_DIR, { recursive: true });

      const destCss = `${BUILD_DIR}/webflow-html-embed.css`;
      await fs.writeFile(destCss, css, 'utf8');
      console.log(`✅ Webflow embed CSS written to ${destCss}`);
    }
  } finally {
    await ctx.dispose();
  }
  process.exit(0);
}

// Development build logic: Watch and serve with live reload
await ctx.watch();
await ctx
  .serve({
    servedir: BUILD_DIR,
    port: SERVE_PORT,
    onRequest: (req, res) => {
      // Force Safari (and all browsers) to never cache during development
      res.setHeader('Cache-Control', 'no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    },
  })
  .then(logServedFiles);

// Helper: log served files
function logServedFiles() {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
      d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]
    );

  const files = walk(BUILD_DIR).filter((f) => !f.endsWith('.map'));

  const filtered = files.filter((file) => !file.includes('client' + sep + 'styles'));

  const info = filtered.map((file) => {
    const parts = file.split(sep);
    parts[0] = SERVE_ORIGIN;
    const url = parts.join('/');
    const tag = file.endsWith('.css')
      ? `<link rel="stylesheet" href="${url}" />`
      : `<script defer src="${url}"></script>`;
    return { Location: url, Snippet: tag };
  });

  console.table(info);
}
