import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    resolve: {
      alias: {
        '@/': `${path.resolve(dirname(fileURLToPath(import.meta.url)), 'src')}/`,
      },
    },
  },
})
