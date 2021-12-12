const fs = require('fs')
const path = require('path')
const PrismicDOM = require('prismic-dom')
const linkResolver = function (doc) {
  return '/' // we just have 1 type of page in this project so we won't bother
}

const manifestPath = path.resolve(__dirname, '../_site/manifest.json')
const iconDefaultSize = 24
const defaultSizes = '90vw'
const defaultImagesSizes = [1920, 1280, 640, 320]
const isFullUrl = (url) => {
  try {
    return !!new URL(url)
  } catch {
    return false
  }
}
module.exports = {
  // Prismic Rich text to html
  asHtml: (data) => {
    return PrismicDOM.RichText.asHtml(data, linkResolver)
  },
  // Prismic Rich text to plain text
  asText: (data) => {
    return PrismicDOM.RichText.asText(data, linkResolver)
  },
  // Allow embedding webpack assets pulled out from `manifest.json`
  // eg: {% webpack "index.css" %}
  webpack: async (name) =>
    new Promise((resolve) => {
      fs.readFile(manifestPath, { encoding: 'utf8' }, (err, data) => resolve(err ? `/${name}` : JSON.parse(data)[name]))
    }),

  // Allow embedding svg icon
  // {% icon "github.svg", "my-class", [24, 24] %}
  icon: (name, className, size = iconDefaultSize) => {
    if (!Array.isArray(size)) size = [size]
    return outdent({ newline: '' })`
    <svg class="icon icon--${name} ${className || ''}" role="img" aria-hidden="true" width="${size[0]}" height="${
      size[1] || size[0]
    }">
      <use xlink:href="/sprite.svg#${name}"></use>
    </svg>`
  },
}
