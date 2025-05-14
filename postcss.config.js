
export default {
  plugins: {
    'tailwindcss/nesting': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true
      },
      stage: 3,
      browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead'
    },
    tailwindcss: {},
    autoprefixer: {},
  }
}
