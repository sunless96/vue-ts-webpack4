const path = require('path')
const config = require('../config')
const INCLUDE_PATHS = path.resolve(__dirname, './' + config.SOURCE_DIR + '/core')
const devMode = process.env.NODE_ENV === 'development'
const OUT_PUT_STYLE = devMode ? 'nested' : 'compressed'

// css loader
exports.cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: true,
    sourceMap: devMode
  }
}

// scss-loader
exports.scssLoader = {
  loader: 'sass-loader',
  options: {
    outputStyle: OUT_PUT_STYLE,
    includePaths: [INCLUDE_PATHS],
    sourceMap: devMode
  }
}

// url-loader
exports.urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 8192,
    name: 'staticimg/[name].[hash:7].[ext]'
  }
}

// image-webpack-loader
exports.ImageWebpackLoader = {
  loader: 'image-webpack-loader',
  options: {
    // disable: true, // webpack@2.x and newer
    mozjpeg: {
      progressive: true,
      quality: 75
    },
    // optipng.enabled: false will disable optipng
    optipng: {
      enabled: false
    },
    pngquant: {
      quality: '65-90',
      speed: 4
    },
    gifsicle: {
      interlaced: false
    },
    // the webp option will enable WEBP
    webp: {
      quality: 75
    }
  }
}
