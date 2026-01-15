export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Options pour garantir la cohérence des préfixes CSS
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
      ],
    },
  },
}
