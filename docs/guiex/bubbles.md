# Bubbles on the board <Badge type="warning" text="mywant-guiex" />

The canvas asks most of its questions in bubbles that float over the board,
pointing at what they are about. They are built from the
[overlay library](/overlays/) <Badge type="tip" text="mywant-gui" /> like every
other overlay; this page shows how the canvas extension puts them together.

## A question about something on the board

The Y-wire's menu, the arrangement's "keep this?", a character's actions: an
`OverlayBubble` anchored above the thing, holding an `OverlayActionGrid`.

```tsx
<OverlayBubble left={x} top={y} width={OVERLAY_CELL_PX * 2} height={OVERLAY_HEIGHT_PX}>
  <OverlayActionGrid
    items={[
      { icon: <X />,     label: 'No',  tone: 'cancel',  onClick: () => answer(false), delay: 0,  keyboard: 'n' },
      { icon: <Check />, label: 'Yes', tone: 'confirm', onClick: () => answer(true),  delay: 60, keyboard: 'y' },
    ]}
    cols={2}
    onClose={() => answer(false)}
    headerLabel="Keep this arrangement?"
    initialFocus={1}
    className="absolute inset-0 rounded-[inherit] overflow-hidden"
  />
</OverlayBubble>
```

`(x, y)` is the top of the thing asked about, in viewport pixels; the bubble
lifts itself clear of it and draws the tail.

## A menu that leads to typing

The Y-wire's menu offers **New**, which asks for a name. The bubble keeps its
width and swaps its content for an `OverlayTextStage`; `contain` keeps the typing
off the board:

```tsx
<OverlayBubble left={x} top={y} width={width} height={height} contain>
  {stage === 'menu' && <OverlayActionGrid items={menuItems} … />}
  {stage === 'name' && (
    <OverlayTextStage
      header="New constellation"
      value={name} onChange={setName}
      onSubmit={create} onBack={() => setStage('menu')}
      submitLabel="Create" busy={saving}
    />
  )}
</OverlayBubble>
```

A menu with more choices than fit a row wraps; give the bubble one row-height
per row (`OVERLAY_HEIGHT_PX * rows`) so the header stays clear of the first.

## A control that must not take the keys

The wire's list of what it holds stays up while you walk the board with the
arrows and press Y — so it cannot be an `OverlayActionGrid`, which claims the
keys while open. It lays out `OverlayCell`s itself, in a bubble placed at a
corner with no tail:

```tsx
<OverlayBubble anchor="at" position="absolute" left={left} top={top} width={w} height={h}>
  {ends.map((e, i) => (
    <OverlayCell key={e.id} static icon={<Circle />} label={e.name} color={wireColour} />
  ))}
  <OverlayCell icon={<Check />} label="OK" tone="confirm" onClick={commit} />
  <OverlayCell icon={<X />} label="Cancel" tone="cancel" onClick={cancel} />
</OverlayBubble>
```

`static` cells show what is on the wire in the wire's own `color`; the two
buttons are ordinary toned cells a finger can press.

## Chrome that is not a grid

The small "talk" pill and the speech bubbles are not menus, but they are drawn
in the overlay's surface and come in the overlay's way, so they read the active
design instead of repeating its classes:

```tsx
const d = overlayDesign();
<button className={`rounded-full ${d.surface}`} style={{ animation: d.enterAnimation }} />
```
