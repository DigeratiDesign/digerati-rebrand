# Webflow 404 animation

The source is `src/client/modules/animation404.ts`, extracted from the supplied
standalone preview. It imports the pinned `three@0.160.1` npm package and injects
its own scoped styles. The exported Webflow markup, copy, and unrelated scripts
remain in `previews/digerati-404-pyramid.html`; the Desktop original is untouched.

The shared DOM-ready phase calls `load404Animation`. It checks for the attribute
before dynamically importing `animation404.js` beside the shared `index.js` URL.
This preserves the existing classic `<script defer src="…/dist/index.js">` embed,
including on nested page URLs. Ordinary pages do not download Three.js.

## Publish

1. Run `pnpm build` and publish the generated `dist` files together, including
   `index.js`, `animation404.js`, and their maps. The animation module must be
   served as JavaScript with CORS allowed when hosted on a different origin.
2. If the Webflow embed pins a release tag, update its existing `index.js` URL to
   the release containing both files. Keep the existing script embed format.
3. On Webflow's 404 page, add an HTML Embed as a **direct child** of the full-screen
   404 section, containing only:

   ```html
   <div dd-animation="404"></div>
   ```

4. Keep the existing content and native `Resync with Reality` link (`href="/"`).
   Publish the Webflow page. No animation CSS or additional script embed is needed.

The section is the animation boundary. The module positions a static section
relatively, isolates its stacking context, and places a pointer-transparent canvas
behind the content. The host is hidden from assistive technology. Pointer bounce
ignores links and other interactive controls. Reduced motion starts with a static
render and pauses both the physics and hue animation; preference changes are live.
The eye uses exactly one material group, transferring only between hidden faces.

## Verify locally

```sh
pnpm check
pnpm lint
pnpm test:build
pnpm build
pnpm verify:production
pnpm exec playwright test -c playwright.404.config.ts --project=chromium
```

The dedicated browser config tests production artifacts without running the
watcher. Tests cover one canvas after repeated initialization, section sizing,
mouse and keyboard link activation, reduced-motion preferences, and ordinary-page
network requests. Install the repo's browser version with
`pnpm exec playwright install chromium` if needed.

To view the preserved exported preview, serve the repo root over HTTP after a
build (for example, `python3 -m http.server 8080`) and visit
`http://localhost:8080/previews/digerati-404-pyramid.html`. Its original external
Webflow assets and unrelated scripts still require a network connection.
