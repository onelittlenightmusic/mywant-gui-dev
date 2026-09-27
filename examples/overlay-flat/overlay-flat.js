/*
 * overlay-flat — a flat overlay design for mywant-gui, as a runtime extension.
 *
 * No build step: mywant-gui loads this file as a plain script before its first
 * render, with its own modules published on window.__mywantModules. The design
 * is only class names; what they look like is in overlay-flat.css, which the
 * manifest lists under "styles". (The app's Tailwind build contains only the
 * classes the app itself uses, so a design from outside brings its own.)
 *
 * Install: copy this directory to ~/.mywant/gui-extensions/overlay-flat and
 * reload the GUI. Pick "Flat" under Overlay Design in your character's display.
 */
(function () {
  var design = {
    id: 'flat',
    name: 'Flat',
    tones: {
      confirm: 'mwf-confirm',
      cancel: 'mwf-cancel',
      danger: 'mwf-danger',
      primary: 'mwf-primary',
      caution: 'mwf-caution',
      info: 'mwf-info',
      accent: 'mwf-accent',
      special: 'mwf-special',
      muted: 'mwf-muted',
    },
    disabled: 'mwf-disabled',
    cell: 'mwf-cell',
    cellInteractive: 'mwf-interactive',
    cellOff: 'mwf-off',
    focus: 'mwf-focus',
    label: 'mwf-label',
    header: 'mwf-header',
    surface: 'mwf-surface',
    frame: 'mwf-frame',
    tailColor: 'var(--mwf-outline)',
    backdrop: 'mwf-backdrop',
    input: 'mwf-input',
    enterAnimation: 'mwf-in 120ms ease-out forwards',
    cellEnterAnimation: 'mwf-cell-in 140ms ease-out both',
  };

  var registry = window.__mywantModules && window.__mywantModules['@/extensions/registry'];
  if (registry && registry.registerExtension) {
    // As an extension — the way anything added to the GUI is added.
    registry.registerExtension({ id: 'overlay-flat', overlayDesigns: [design] });
  } else if (window.__mywant && window.__mywant.registerOverlayDesign) {
    window.__mywant.registerOverlayDesign(design);
  }
})();
