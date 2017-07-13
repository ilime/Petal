const path = require('path')
const merge = require('webpack-merge')
const BaseConfig = require('./config.base')

const DEV_OUTPUT_PATH = path.resolve(__dirname, '../bundle')
const STYLE_PATH = path.resolve(__dirname, '../src/static')

module.exports = merge(BaseConfig, {
  output: {
    path: DEV_OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(scss|sass)$/,
      include: STYLE_PATH,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  target: 'electron-renderer'
})