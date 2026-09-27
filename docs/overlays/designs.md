# Designs <Badge type="tip" text="mywant-gui" />

A **design** is how overlays look: the colour each [tone](/overlays/tones) gets,
the cell's shape and hover, the focus ring, the words, the box and its tail, how
it comes in. The layout is not the design's — every design lays out on the same
cells — so switching designs never moves anything.

The built-in design is **`grid`**: full-bleed coloured tiles on a dark box.
Other designs come from extensions, and a person picks one for themselves.

## The OverlayDesign type

```ts
interface OverlayDesign {
  id: string;
  name: string;                          // what the picker calls it
  tones: Record<OverlayTone, string>;    // a cell's fill, per tone
  disabled: string;                      // a cell that cannot be pressed
  cell: string;                          // every cell: shape, not colour
  cellInteractive: string;               // hover / press feedback
  cellOff: string;                       // the off half of an on/off cell
  focus: string;                         // the ring's shape (its colour is --mw-focus-ring)
  label: string;                         // the word under the icon
  header: string;                        // the question over a grid
  surface: string;                       // fill + outline, any shape
  frame: string;                         // the bubble's box (shape + surface)
  tailColor: string;                     // a CSS colour for the bubble's tail
  backdrop: string;                      // laid over a card behind its overlay
  input: string;                         // a text field in an overlay
  enterAnimation: string;                // CSS animation shorthand
  cellEnterAnimation: string;
  portable?: OverlayPortableStyle;       // the same look as plain CSS values (below)
}
```

Every field except `tailColor` and the animations is a **class name**.

::: warning Bring your own classes
The app's Tailwind build contains only the classes the app itself uses. A design
from an extension cannot count on an arbitrary Tailwind class existing, so it
names classes its own stylesheet defines — the `styles` of its
[manifest](/extensions/runtime). The [flat tutorial](/overlays/flat) does exactly
this.
:::

A design registered with some fields missing gets the `grid` values for them, so
a design can restyle only what it cares about.

## Registering a design

From an extension — the usual way:

```ts
registerExtension({ id: 'my-look', overlayDesigns: [myDesign] });
```

Directly:

```ts
import { registerOverlayDesign } from '@/components/overlay';
registerOverlayDesign(myDesign);

// or, from a plain script with no imports:
window.__mywant.registerOverlayDesign(myDesign);
```

Registering an id that already exists replaces it — `grid` included.

## Choosing a design

The choice is a display setting of the person's character, like the canvas's
design, stored at `display.ext.overlay.design`. A choice naming a design that is
not installed falls back to `grid`.

```ts
import { overlayDesignOf, withOverlayDesign, listOverlayDesigns } from '@/components/overlay';

overlayDesignOf(character.display);            // 'grid' | 'flat' | …
put({ ext: withOverlayDesign(display, 'flat') }); // in a display editor
```

## Reading the design in use

Inside the library this is done for you. Code that draws overlay-like chrome of
its own — a pill-shaped prompt, a speech bubble — reads the design rather than
repeating its classes:

```tsx
const design = useOverlayDesign();      // re-renders on a change
<div className={`rounded-full ${design.surface}`} style={{ animation: design.enterAnimation }} />

overlayDesign();                        // the same, outside a React render
```

## Outside the app: portable values <Badge type="tip" text="mywant-gui" />

Class names only mean something inside the app. Overlays drawn on other
people's pages — the browser extension's and the bookmarklet's menus — need the
look as values, so a design can carry them:

```ts
interface OverlayPortableStyle {
  tones: Record<OverlayTone, string>;   // CSS colours
  surface: string; outline: string; ink: string;   // the box: fill, outline, words
  radius: number;                        // box corner, px
  cellRadius: number; cellGap: number;   // 0 and 0 are full-bleed tiles
  labelTransform: 'uppercase' | 'none'; labelWeight: number; labelSize: number;
  backdrop: string;                      // laid over a page behind a dialog
}
```

`withOverlayDesign` stores the chosen design's `portable` with the choice
(`display.ext.overlay.portable`), so anything that can read the character can
draw its menus the same way without knowing any design by name. A design
without `portable` stores the grid's. Read it back with
`portableOverlayStyleOf(display)`.

## In the extension and the bookmarklet <Badge type="warning" text="mywant-guiex" />

The control pill reads the viewer's character anyway (who they are, their
colour). It writes the stored portable values onto the page's root as custom
properties — `--mwo-confirm` … `--mwo-muted`, `--mwo-surface`, `--mwo-outline`,
`--mwo-ink`, `--mwo-radius`, `--mwo-cell-radius`, `--mwo-cell-gap`,
`--mwo-label-transform`, `--mwo-label-weight`, `--mwo-label-size`,
`--mwo-backdrop` — and every menu the extension draws reads them with the grid
look as the fallback:

```css
.mwc-tile-rose { background: var(--mwo-danger, rgba(190,18,60,.9)); }
.mwc-actions   { gap: var(--mwo-cell-gap, 0px); padding: var(--mwo-cell-gap, 0px); }
```

Custom properties cross into shadow roots, so the pill (in its own shadow root)
and the inspector's menus (in the page) follow the same values.

## The picker <Badge type="warning" text="mywant-guiex" />

The canvas extension's character display editor lists every registered design
under **Overlay Design**, next to **Canvas Design**, and re-renders when a design
registers late:

```tsx
useEffect(() => onOverlayDesignRegistered(() => force(v => v + 1)), []);

{listOverlayDesigns().map(design => (
  <Pill
    key={design.id}
    label={design.name}
    active={overlayDesignOf(d) === design.id}
    onClick={() => put({ ext: withOverlayDesign(d, design.id) })}
  />
))}
```
