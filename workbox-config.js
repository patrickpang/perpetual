module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{png,html,js,css}', 'manifest.json'],
  runtimeCaching: [
    {
      urlPattern: /\.(ttf|eot|woff|woff2)$/,
      handler: 'cacheFirst',
    },
  ],
  swDest: 'build/service-worker.js',
}
