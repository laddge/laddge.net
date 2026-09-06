// @ts-check
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import AutoImport from 'astro-auto-import'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: `https://laddge.net`,
  scopedStyleStrategy: 'where',
  server: {
    allowedHosts: true,
  },
  build: {
    assets: 'assets',
  },
  integrations: [
    icon(),
    AutoImport({
      imports: Object.keys(import.meta.glob('./src/components/blog/*.astro')),
    }),
    mdx(),
  ],
})
