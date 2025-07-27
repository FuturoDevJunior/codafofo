module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano:
      process.env.NODE_ENV === 'production'
        ? {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeWhitespace: true,
                colormin: true,
                minifyFontValues: true,
                minifySelectors: true,
              },
            ],
          }
        : false,
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
      },
    },
  },
};
