'use strict'
const utils = require('./utils')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ? false : true
const cacheBusting = true

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
