import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import { h } from 'hastscript'
import remarkDirective from 'remark-directive'
import rlc from 'remark-link-card'
import { visit } from 'unist-util-visit'

import CNAME from './public/CNAME?raw'
const myRemarkPlugin = () => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {})
        if (['info', 'success', 'warning', 'error'].indexOf(node.name) != -1) {
          const bg = {
            info: 'bg-info',
            success: 'bg-success',
            warning: 'bg-warning',
            error: 'bg-error',
          }
          const text = {
            info: 'text-info-content',
            success: 'text-success-content',
            warning: 'text-warning-content',
            error: 'text-error-content',
          }
          const svg = {
            info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
            success:
              '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            warning:
              '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
            error:
              '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
          }
          parent.children[index] = {
            type: 'element',
            data: {
              hName: 'div',
              hProperties: {
                class: `flex gap-4 items-center ${bg[node.name]} ${
                  text[node.name]
                } rounded-box px-6 py-2 my-3 ${node.attributes.class || ''}`.trim(),
              },
            },
            children: [
              {
                type: 'element',
                data: {
                  hName: 'div',
                  hProperties: {
                    class: 'flex-none',
                  },
                },
                children: [
                  {
                    type: 'html',
                    value: svg[node.name],
                  },
                ],
              },
              {
                type: 'element',
                data: {
                  hName: 'div',
                  hProperties: {
                    class: 'grow',
                  },
                },
                children: [...node.children],
              },
            ],
          }
        } else {
          const hast = h(node.name, node.attributes)
          data.hName = hast.tagName
          data.hProperties = hast.properties
        }
      }
    })
  }
}

// https://astro.build/config
export default defineConfig({
  site: `https://${CNAME.slice(0, CNAME.indexOf('\n'))}`,
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    remarkPlugins: [
      [
        rlc,
        {
          shortenUrl: true,
        },
      ],
      remarkDirective,
      myRemarkPlugin,
    ],
  },
  integrations: [tailwind(), svelte(), sitemap()],
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
})
