const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const config = require('../config')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../', config.BUILD_DIR),
    compress: false,
    hot: true,
    hotOnly: true
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: '[name].[hash].js'
  }
})
