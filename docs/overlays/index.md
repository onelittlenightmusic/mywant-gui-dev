# The overlay library <Badge type="tip" text="mywant-gui" />

An **overlay** is anything the GUI puts over a card or the board and asks you
to answer: a card's long-press actions, the Shift+Enter menu, a yes/no, the
board's bubbles. They are all the same object — a box of cells, each an icon
over a word, one of them ringed where the keys are — and they are all drawn from
one library:

```ts
import {
  OverlayActionGrid, OverlayCell, OverlayBubble, OverlayTextStage,
  type OverlayItem, type OverlayTone,
} from '@/components/overlay';
```

An overlay says **what each action means** (its [tone](/overlays/tones)).
**How it looks** is the active [design](/overlays/designs)'s business, and a
design can come from an extension. Nothing outside the library paints an
overlay; [the build check](/overlays/check) keeps it that way.

## Which piece to use

| You need | Use |
|---|---|
| A menu of actions with arrow-key / D-pad selection | `OverlayActionGrid` |
| One cell in a layout of your own | `OverlayCell` |
| A box floating over the board, pointing at something | `OverlayBubble` |
| A few words typed in, with back / submit | `OverlayTextStage` |

## OverlayActionGrid

A grid of cells over a backdrop, with keyboard and gamepad selection: arrows /
D-pad move, Enter / A presses, Escape / B closes. It claims the input while it
is open, so the page behind does not hear the same keys.

```tsx
<OverlayActionGrid
  items={[
    { icon: <X />,     label: 'No',  tone: 'cancel',  onClick: no,  delay: 0,  keyboard: 'n' },
    { icon: <Check />, label: 'Yes', tone: 'confirm', onClick: yes, delay: 30, keyboard: 'y' },
  ]}
  cols={2}
  onClose={no}
  headerLabel="Keep this?"
  initialFocus={1}
/>
```

An `OverlayItem`:

| Field | |
|---|---|
| `icon`, `label`, `title` | What the cell shows, and its tooltip |
| `tone` | What the action means — decides its colour. See [Tones](/overlays/tones) |
| `color` | A colour that is data, not meaning (a character's own colour). Replaces `tone` |
| `off` | The off half of an on/off action: the same tone, held back |
| `disabled` | Cannot be pressed now |
| `delay` | Entrance stagger in ms (`OVERLAY_STAGGER_MS` per cell) |
| `keyboard` | A letter that presses it (`'y'`, `'n'`) |

There is no class-name field on purpose: an item cannot say how it is painted.

## OverlayCell

The unit every overlay is made of. Use it directly when the grid's layout does
not fit — cells beside a text field, or a list that shows things rather than
offering them:

```tsx
<OverlayCell icon={<Check />} label="OK" tone="confirm" onClick={ok} focused={focus === 'ok'} />
<OverlayCell static icon={<Circle />} label={name} color={wireColour} />
```

`static` draws the same cell as a non-button. `focused` draws the ring; its
colour is whoever holds the keys (the CSS variable `--mw-focus-ring`).

## OverlayBubble

The box an overlay sits in when there is no card to borrow — a bubble on the
board. `anchor="above"` (the default) centres it over a point and draws a tail
down to it; `anchor="at"` places its corner and draws no tail.

```tsx
<OverlayBubble left={x} top={y} width={OVERLAY_CELL_PX * 3} height={OVERLAY_HEIGHT_PX}>
  <OverlayActionGrid ... />
</OverlayBubble>
```

Pass `contain` when the bubble holds a text field: keys and presses inside then
stay inside, so typing never walks a tile across the board.

## OverlayTextStage

A header, a field, and under it two cells — back and submit — so a finger can
answer what Enter and Escape answer on a keyboard. IME-safe: the Enter that
confirms a Japanese conversion does not submit.

```tsx
<OverlayTextStage
  header="New constellation"
  value={name}
  onChange={setName}
  onSubmit={create}
  onBack={() => setStage('menu')}
  submitLabel="Create"
/>
```

## Sizes

Every design lays out on the same grid, so a bubble sized for one fits another:

| Constant | |
|---|---|
| `OVERLAY_CELL_PX` | 72 — one cell |
| `OVERLAY_MAX_ROW` | 6 — cells in a row before it wraps |
| `OVERLAY_HEIGHT_PX` | 108 — a header over one row |
| `OVERLAY_STAGGER_MS` | 30 — entrance stagger per cell |
