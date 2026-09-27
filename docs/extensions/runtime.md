# Runtime extensions <Badge type="tip" text="mywant-gui" />

A runtime extension is installed beside the GUI rather than built into it: a
directory with a manifest, a script and optional stylesheets. The GUI server
lists what is installed; the web app loads each one before its first render.

## The manifest

`gui-extension.json`:

```json
{
  "name": "overlay-flat",
  "version": "0.1.0",
  "requires": "v0.6.109",
  "script": "overlay-flat.js",
  "styles": ["overlay-flat.css"],
  "public": "public"
}
```

| Field | |
|---|---|
| `name` | The extension's name — also its URL prefix, `/gui-extensions/<name>/` |
| `version` | Shown in the listing; added to asset URLs so a new version is not cached |
| `requires` | The mywant-gui version it was built against (below) |
| `script` | The script that registers it |
| `styles` | Stylesheets loaded before the script |
| `public` | A directory served at the site root |

### requires

An extension that imports the app's modules depends on their shape, so it names
the mywant-gui release it was built against:

- no `requires` — loaded (it declares no dependency)
- either side a development build — loaded, with a note in the server log
- both releases — loaded only when they are equal

An extension that only calls a stable API — like registering an overlay design
— can leave `requires` out.

## The script

A plain script, run once. It registers the extension, reaching the app through
two globals the app sets up before loading any extension:

| Global | |
|---|---|
| `window.__mywantModules['@/…']` | Every module of the app's `src`, by its `@/` path (a directory's `index` answers for the directory), plus `react`, `react/jsx-runtime`, `react-dom`, `react-dom/client` and `react-router-dom` |
| `window.__mywant` | A few functions for scripts that import nothing: `registerPlugin` (want-card plugins), `createCardLayout`, `registerOverlayDesign` |

```js
(function () {
  var registry = window.__mywantModules['@/extensions/registry'];
  registry.registerExtension({ id: 'my-extension', overlayDesigns: [/* … */] });
})();
```

A bundled extension written in TypeScript does the same with ordinary imports,
turned into those lookups by its build (see below).

## Listing what is installed

```sh
curl -s localhost:8081/api/v1/gui-extensions
```

A script that fails, or a server that does not answer within three seconds,
costs that extension and nothing else — the app starts without it.

## Building one with Vite <Badge type="warning" text="mywant-guiex" />

The canvas extension is TypeScript and React, built with Vite into one IIFE. Its
config resolves imports this way:

- `@/…` that exists in the extension's own `src` — bundled
- any other `@/…` — external, read from `window.__mywantModules[id]`
- `react` and friends — a small CommonJS shim that returns the app's copy, so
  bundled packages that `require('react')` get the same one

Its `gui-extension.json` is written by its installer (`mywant-guiex install`),
with `requires` set to the mywant-gui tag of its submodule.
