# Development setup

## The app <Badge type="tip" text="mywant-gui" />

```sh
git clone https://github.com/onelittlenightmusic/mywant-gui
cd mywant-gui
make install            # builds web/ and the Go server, installs mywant-gui
mywant gui start -D     # serves the GUI (default port 8081)
```

`make install` runs `npm run build` in `web/`, which runs, in order:

1. `scripts/gen-want-icons.mjs` — the per-category home-screen icons
2. `scripts/check-overlays.mjs` — see [The build check](/overlays/check)
3. `tsc` and `vite build`

The web app's source is under `web/src`. The pieces this site talks about:

| Path | What |
|---|---|
| `web/src/components/overlay/` | The overlay library |
| `web/src/extensions/registry.ts` | The extension API (`registerExtension`) |
| `web/src/extensions/runtime.ts` | Loading extensions installed beside the app |
| `web/src/extensions/modules.ts` | Publishing the app's modules on `window.__mywantModules` |

## Where extensions are installed <Badge type="tip" text="mywant-gui" />

The GUI server lists every directory containing a `gui-extension.json` under,
in order:

1. `$MYWANT_GUI_EXTENSIONS_DIR`, if set (and nothing else)
2. `~/.mywant/gui-extensions/<name>/`
3. `<prefix>/share/mywant/gui-extensions/<name>/` for the install prefix and
   the usual Homebrew prefixes

See [Runtime extensions](/extensions/runtime) for the manifest.

## The canvas extension <Badge type="warning" text="mywant-guiex" />

mywant-guiex keeps mywant-gui as a git submodule (`mywant-gui/`) and builds
against it:

```sh
make gui-restart   # builds and installs mywant-gui from the submodule,
                   # builds the extension, installs it, restarts the GUI
```

Its extension build (`make build-extension`) runs the same
`check-overlays.mjs` from the submodule over its own `web/src` before `tsc`.
A change to the app goes to mywant-gui first; mywant-guiex then moves its
submodule to that commit.
