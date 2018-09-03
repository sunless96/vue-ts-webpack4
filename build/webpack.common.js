const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin') // 打包前后文件映射关系
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HtmlImportDllPlugin = require('./html-import-dll-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config')
const loader = require('./loader')
const NODE_ENV = process.env.NODE_ENV
// const vueLoaderConfig = require('./vue-loader-config')
const devMode = process.env.NODE_ENV === 'development'
const BUILD_PATH = '../' + config.BUILD_DIR

module.exports = {
  // 入口
  entry: {
    index: 'index.js'
    // common: [],
    // ui: '',
    // app: ''
  },
  // optimization: {},
  module: {},
  resolve: {
    // 解决路径问题
    modules: [path.join(__dirname, '../node_modules'), path.join(__dirname, '../' + config.SOURCE_DIR)],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    alias: {}
  },
  output: {
    path: path.join(__dirname, BUILD_PATH),
    publicPath: config.getPublicPath(NODE_ENV)
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: NODE_ENV === 'development' ? true : false,
      __TEST__: NODE_ENV === 'test' ? true : false,
      __PRODUCTION__: NODE_ENV === 'production' ? true : false
    }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      // favicon: 'src/public/favicon.ico',
      template: 'src/index.html',
      chunks: ['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlImportDllPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, BUILD_PATH),
      manifest: require(path.join(__dirname, BUILD_PATH + '/manifest-vendors.json'))
    })
  ]
}
