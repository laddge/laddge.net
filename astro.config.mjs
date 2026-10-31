// @ts-check
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import AutoImport from 'astro-auto-import'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import sveltia from 'astro-loader-sveltia-cms'

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
    sveltia({
      config: {
        backend: { name: 'github', repo: 'laddge/laddge.net', branch: 'master', base_url: 'https://sveltia-cms-auth.dev-laddge.workers.dev' },
        media_folder: '/public/images',
        collections: [
          {
            name: 'posts',
            folder: 'src/content/blog',
            path: '{{fields.slug}}/index',
            media_folder: '',
            extension: 'mdx',
            fields: [
              { name: 'title', widget: 'string' },
              { name: 'slug', widget: 'string' },
              { name: 'description', widget: 'string', required: false },
              { name: 'tags', widget: 'list', required: false },
              { name: 'publishDate', widget: 'datetime' },
              { name: 'body', widget: 'markdown' },
            ],
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
