// @ts-check
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'

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
  integrations: [icon()],
})
