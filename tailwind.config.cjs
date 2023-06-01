/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        laddge: {
          primary: '#67bdda',
          'primary-focus': '#34a8cf',
          'primary-content': '#003142',
          secondary: '#c4b4fd',
          'secondary-focus': '#815ffa',
          'secondary-content': '#120056',
          accent: '#eab9a8',
          'accent-focus': '#da8367',
          'accent-content': '#511400',
          neutral: '#0b2e3b',
          'neutral-focus': '#0a2732',
          'neutral-content': '#a8e7ff',
          'base-100': '#ffffff',
          'base-200': '#e5e5e5',
          'base-300': '#cccccc',
          'base-content': '#333333',
          info: '#c9e1e7',
          'info-content': '#093f4d',
          success: '#dff2a0',
          'success-content': '#3e5100',
          warning: '#f6e487',
          'warning-content': '#4c3f00',
          error: '#f1b6b5',
          'error-content': '#560100',
        },
      },
    ],
  },
}
