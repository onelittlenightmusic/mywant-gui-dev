# mywant-gui-dev

Developer documentation for [mywant-gui](https://github.com/onelittlenightmusic/mywant-gui)
and its extensions — the overlay library, overlay designs, and writing extensions.

Published at https://onelittlenightmusic.github.io/mywant-gui-dev/

Pages are labelled by layer: **mywant-gui** (the public app) or **mywant-guiex**
(the canvas extension). See `docs/guide/layers.md`.

## Examples

- [`examples/overlay-flat`](examples/overlay-flat) — a flat overlay design as a
  runtime extension. Copy it to `~/.mywant/gui-extensions/overlay-flat`.

## Working on the docs

```sh
npm install
npm run docs:dev      # http://localhost:5173/mywant-gui-dev/
npm run docs:build
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).
