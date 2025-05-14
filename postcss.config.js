
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'postcss-preset-env': {
      features: {
        'custom-properties': true,
        'nesting-rules': true
      }
    },
    tailwindcss: {},
    autoprefixer: {},
  }
}
