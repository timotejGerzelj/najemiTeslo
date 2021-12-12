require('dotenv').config()

const path = require('path')
const fs = require('fs')
const shortcodes = require('./utils/shortcodes')
const transforms = require('./utils/transforms')
const filters = require('./utils/filters')
const componentsDir = `./src/_includes/components`
const Container = require(`${componentsDir}/Container`)

module.exports = function (config) {
  const manifestPath = path.resolve(__dirname, '_site/manifest.json')

  // Transforms
  Object.keys(transforms).forEach((key) => {
    config.addTransform(key, transforms[key])
  })

  // Filters
  config.addFilter('formatDate', filters.formatDate)

  // ShortComps
  config.addPairedShortcode('Container', Container)

  // Shortcodes
  config.addNunjucksAsyncShortcode('image', shortcodes.image)
  config.addNunjucksAsyncShortcode('webpack', shortcodes.webpack)

  // Pass-through files
  // Everything inside static is copied verbatim to `_site`
  config.addPassthroughCopy({ 'src/public': '/' })

  // BrowserSync Overrides
  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    // Reload when manifest file changes
    files: [manifestPath],
    // Show 404 page on invalid urls
    callbacks: {
      ready: (err, browserSync) => {
        browserSync.addMiddleware('*', (req, res) => {
          const fourOFour = fs.readFileSync('_site/404.html')
          res.writeHead(404, { 'Content-Type': 'text/html charset=UTF-8' })
          res.write(fourOFour)
          res.end()
        })
      },
    },
    // Speed/clean up build time
    ui: false,
    ghostMode: false,
  })

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
  }
}
