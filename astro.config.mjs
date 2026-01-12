// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import cname from 'vite-plugin-cname'

const CNAME = 'laddge.net'

// https://astro.build/config
export default defineConfig({
  site: `https://${CNAME}`,
  server: {
    allowedHosts: true,
  },
  vite: {
    plugins: [tailwindcss(), cname(CNAME)],
  },
});
