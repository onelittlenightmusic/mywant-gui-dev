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
    // The same look as values, for menus drawn where this stylesheet is not
    // loaded — the browser extension's and the bookmarklet's, on other pages.
    // Stored with the choice; they apply it as CSS custom properties.
    portable: {
      tones: {
        confirm: '#10b981', cancel: '#94a3b8', danger: '#ef4444', primary: '#3b82f6',
        caution: '#f59e0b', info: '#0ea5e9', accent: '#6366f1', special: '#8b5cf6', muted: '#64748b',
      },
      surface: '#ffffff',
      outline: '#e2e8f0',
      ink: '#334155',
      radius: 14,
      cellRadius: 10,
      cellGap: 3,
      labelTransform: 'none',
      labelWeight: 600,
      labelSize: 10,
      backdrop: 'rgba(255,255,255,.6)',
    },
  };

  var registry = window.__mywantModules && window.__mywantModules['@/extensions/registry'];
  if (registry && registry.registerExtension) {
    // As an extension — the way anything added to the GUI is added.
    registry.registerExtension({ id: 'overlay-flat', overlayDesigns: [design] });
  } else if (window.__mywant && window.__mywant.registerOverlayDesign) {
    window.__mywant.registerOverlayDesign(design);
  }
})();
