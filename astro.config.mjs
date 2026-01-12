// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import cname from 'vite-plugin-cname'
import icon from 'astro-icon'
const CNAME = 'laddge.net'

// https://astro.build/config
export default defineConfig({
  site: `https://${CNAME}`,
  server: {
    allowedHosts: true,
  },
  build: {
    assets: 'assets',
  },
  vite: {
    plugins: [tailwindcss(), cname(CNAME)],
  },
  integrations: [icon()],
})
