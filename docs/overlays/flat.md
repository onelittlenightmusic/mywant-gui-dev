# Tutorial: a flat design <Badge type="tip" text="mywant-gui" />

The built-in `grid` design draws overlays as full-bleed coloured tiles on a dark
box. This tutorial builds **Flat** — a light card, cells as separate rounded
tiles with a gap between them, solid colours, words in their own case — and
ships it as an extension that installs beside the GUI with no build step.

A design can also be shipped as a design custom, installed with
`mywant custom install owner/repo` — see [Tutorial: a design plugin](/overlays/design-plugin),
which compares the two. The finished extension is in this site's repository:
[`examples/overlay-flat`](https://github.com/onelittlenightmusic/mywant-gui-dev/tree/main/examples/overlay-flat).

```
overlay-flat/
├── gui-extension.json   the manifest
├── overlay-flat.js      registers the design
└── overlay-flat.css     what its class names look like
```

## 1. The manifest

<<< @/../examples/overlay-flat/gui-extension.json

No `requires`: the extension uses only the design API, so it does not pin a
mywant-gui version. See [Runtime extensions](/extensions/runtime).

## 2. The design

A design is only class names ([Designs](/overlays/designs)). Flat prefixes its
own with `mwf-` and registers through the extension API, which mywant-gui
publishes on `window.__mywantModules` before it loads any extension:

<<< @/../examples/overlay-flat/overlay-flat.js

The `portable` block is the same look as values: the browser extension and the
bookmarklet draw their menus with it on other people's pages, where
`overlay-flat.css` is not loaded (see [Designs](/overlays/designs#outside-the-app-portable-values)).

## 3. The stylesheet

The classes the design names. The app's Tailwind build would not contain them,
which is why a design from outside brings its own. Dark mode follows the app's
`dark` class on `<html>`; the focus ring takes whoever holds the keys' colour
from `--mw-focus-ring`:

<<< @/../examples/overlay-flat/overlay-flat.css

## 4. Install it

```sh
cp -R examples/overlay-flat ~/.mywant/gui-extensions/overlay-flat
# reload the GUI in the browser
curl -s localhost:8081/api/v1/gui-extensions   # lists overlay-flat
```

## 5. Pick it

Open **Settings → Overlay Design**, or your character's **Display** tab on the
**Characters** page, and choose **Flat**. Every overlay
changes at once — the card long-press menus, Shift+Enter, the yes/no questions
and the board's bubbles — because every one of them is drawn from the
[overlay library](/overlays/).

The choice is stored on the character, at `display.ext.overlay.design`; with
no character chosen in the browser, Settings keeps it in the browser instead.

## Making it yours

- Change only what you care about: fields you leave out of a design are taken
  from `grid`.
- Keep the tones' meanings. A design decides what `danger` looks like, never
  which actions are dangerous.
- Keep the cell's size. The layout is shared by every design; restyle the
  cell's shape inside it (`margin`, `border-radius`), as Flat does.
