# Two layers, two labels

The MyWant GUI is built in two layers, and this site documents both. Every page
and section says which one it is about with a label.

| Label | Layer | What it is |
|---|---|---|
| <Badge type="tip" text="mywant-gui" /> | The public app | The GUI server, the `mywant-gui` CLI and the web app without the canvas. Open source: [onelittlenightmusic/mywant-gui](https://github.com/onelittlenightmusic/mywant-gui). |
| <Badge type="warning" text="mywant-guiex" /> | The canvas extension | The canvas (the board), kata, the robot cursor and the bookmarklet. Built as an extension of mywant-gui and installed beside it. |

## How the two fit

mywant-guiex is an **extension** of mywant-gui, not a fork of it. It is built
against a mywant-gui release and installed into
`~/.mywant/gui-extensions/guiex`; mywant-gui loads it at startup, before its first
render. Everything mywant-guiex uses from the app — the overlay library, the
stores, the hooks — it reaches through the app's published modules
(`window.__mywantModules`), so the two share one copy of each.

That makes the rule simple:

- Anything under <Badge type="tip" text="mywant-gui" /> is available to every
  extension, including one you write.
- Anything under <Badge type="warning" text="mywant-guiex" /> describes how the
  canvas extension uses those pieces. It is there as a worked example and so the
  two layers can be read side by side; the canvas's own source is not public.

## Reading the labels

A page title carries the label of the layer the whole page is about. A section
inside a page carries its own label when it is about the other layer:

## Something in the app <Badge type="tip" text="mywant-gui" />

Applies to mywant-gui itself, and so to every extension.

## Something on the board <Badge type="warning" text="mywant-guiex" />

Describes the canvas extension.
