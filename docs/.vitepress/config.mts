import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'mywant-gui dev',
  description: 'Developer documentation for the MyWant GUI and its extensions',
  // Served from GitHub Pages at /mywant-gui-dev/.
  base: '/mywant-gui-dev/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/layers' },
      { text: 'Overlays', link: '/overlays/' },
      { text: 'Extensions', link: '/extensions/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Two layers, two labels', link: '/guide/layers' },
          { text: 'Development setup', link: '/guide/setup' },
        ],
      },
      {
        text: 'Overlays',
        items: [
          { text: 'The overlay library', link: '/overlays/' },
          { text: 'Tones', link: '/overlays/tones' },
          { text: 'Designs', link: '/overlays/designs' },
          { text: 'Tutorial: a flat design', link: '/overlays/flat' },
          { text: 'The build check', link: '/overlays/check' },
          { text: 'Bubbles on the board', link: '/guiex/bubbles' },
        ],
      },
      {
        text: 'Extensions',
        items: [
          { text: 'Writing an extension', link: '/extensions/' },
          { text: 'Runtime extensions', link: '/extensions/runtime' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/onelittlenightmusic/mywant-gui' },
    ],
    search: { provider: 'local' },
    outline: [2, 3],
  },
})
