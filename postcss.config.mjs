export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    cssnano: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
  },
}
