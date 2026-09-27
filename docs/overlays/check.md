# The build check <Badge type="tip" text="mywant-gui" />

`web/scripts/check-overlays.mjs` fails the build when a piece of overlay design
is written out by hand outside `src/components/overlay`. It is how two dozen
overlays, each with its own idea of what "Cancel" looks like, became one.

```sh
node scripts/check-overlays.mjs            # checks ./src
node scripts/check-overlays.mjs path/src   # checks another tree
npm run check:overlays
```

## What it looks for

| Found outside the library | Use instead |
|---|---|
| The overlay surface classes (`bg-slate-900 border border-slate-600`) | `OverlayBubble`, or `useOverlayDesign().surface` for another shape |
| The overlay outline colour (`rgb(71 85 105)`) — a hand-drawn tail | `OverlayBubble`, or `useOverlayDesign().tailColor` |
| The entrance animation names (`quickActionsIn`, `quickActionBtnIn`) as strings | `useOverlayDesign().enterAnimation` / `.cellEnterAnimation`, or `OverlayCell` |

CSS files are skipped (the keyframes are defined in one), and so is the library
itself.

The type system covers the rest: `OverlayItem` and a card's `EntityCardAction`
have no class-name field, only `tone`, so an item cannot say how it is painted.

## Where it runs <Badge type="tip" text="mywant-gui" />

`npm run build` in `web/` — and so `make install` — runs it before `tsc`.

## Where it runs <Badge type="warning" text="mywant-guiex" />

The canvas extension runs the same script, from its submodule, over its own
source before its type check:

```make
build-extension:
	cd web && node ../mywant-gui/web/scripts/check-overlays.mjs src && npx tsc --noEmit -p . && …
```

One script, two trees: the rule is the app's, and the extension is held to it.
