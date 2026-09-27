# Writing an extension <Badge type="tip" text="mywant-gui" />

An extension adds to the GUI without changing it: pages, menu entries, pieces
of existing screens, settings, and [overlay designs](/overlays/designs). It is
one object handed to `registerExtension`:

```ts
import { registerExtension } from '@/extensions/registry';

registerExtension({
  id: 'my-extension',
  routes: [{ path: '/my-page', element: <MyPage /> }],
  menu: [{ id: 'my-page', label: 'Mine', icon: Star, href: '/my-page', color: '#0891b2' }],
  slots: { settingsSection: MySettings },
  overlayDesigns: [myDesign],
});
```

Registering twice with the same `id` does nothing the second time.

## What an extension can add

| Field | What |
|---|---|
| `routes` | Pages inside the app frame |
| `bareRoutes` | Pages outside it — no header, no sidebar |
| `menu` | Entries in the app menu |
| `logTabs` | Tabs of the logs page, after its own |
| `slots` | Components put in named places (below) |
| `overlayDesigns` | Designs for every overlay — see [Designs](/overlays/designs) |
| `interact` | Answers the header's bubble; the first registered wins |
| `pluginEndpoints` | More endpoints listing runtime want-card plugins |
| `appHooks` / `layoutHooks` | Hooks run once at the app root / inside the router |
| `setup` | Run once when registered — for registries and globals of its own |

## Slots

| Slot | Props | Where |
|---|---|---|
| `appRoot` | — | Mounted once at the app root, inside the router |
| `headerModeLamp` | `below`, `onPointerDown` | The header's mode lamp |
| `interactOverlay` | `onSay` | Over the header, for things waiting on an answer |
| `interactProviderSelect` | `open` | Beside the header's bubble |
| `settingsSection` | — | A section of the Settings modal |
| `groupDetails` | `groupName` | Below a constellation's details |
| `themeMarks` | `themeName`, `color` | In a theme's header, after its count |
| `characterDetails` | `character` | A character's sheet on the Characters page, after the colour and the shape |
| `characterDisplay` | `display`, `put` | A character's Display tab, after Icon Style; `put(patch)` saves part of the display |

Several extensions may fill the same slot; they are drawn in registration order.

## Built in, or beside

An extension reaches the app one of two ways:

- **Built in** — imported by `web/src/extensions/installed.ts` and compiled with
  the app. The public app ships with none.
- **Installed beside it** — a script and stylesheets in
  `~/.mywant/gui-extensions/<name>/`, loaded at startup before the first render.
  See [Runtime extensions](/extensions/runtime).

Either way `registerExtension` must run before the first render: routes, the
menu and hooks are read as fixed from then on. (Overlay designs are the
exception — a design that registers late is picked up.)

## The canvas extension <Badge type="warning" text="mywant-guiex" />

mywant-guiex is an extension of this kind, installed beside the app. It adds the
`/canvas`, `/kata` and related pages and their menu entries,
fills the header's mode lamp, the interact overlay and the Settings section,
puts the canvas's choices (canvas design, tile and aura, speeds) into the
Characters page through `characterDetails` and `characterDisplay`, and
answers the header's bubble with the robot. Its extension build
(`vite.extension.config.ts`) produces one IIFE, `guiex.js`, plus `guiex.css`.
Imports of the app's modules (`@/…`) are not bundled: they become lookups in
`window.__mywantModules`, so the extension and the app share one React, one
router and one copy of every store.
