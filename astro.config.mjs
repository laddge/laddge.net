import { defineConfig } from 'astro/config';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    resolve: {
      alias: {
        '@/': `${path.resolve(dirname(fileURLToPath(import.meta.url)), 'src')}/`
      }
    }
  }
});
