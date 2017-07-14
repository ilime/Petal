const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const BaseConfig = require('./config.base')
const DEV_OUTPUT_PATH = path.resolve(__dirname, '../bundle')
const STYLE_PATH = path.resolve(__dirname, '../src/static')
const port = 3000
const publicPath = `http://localhost:${port}/bundle/`

module.exports = merge.smart(BaseConfig, {
  devtool: 'eval',
  output: {
    path: DEV_OUTPUT_PATH,
    filename: '[name].bundle.js',
    publicPath
  },
  module: {
    rules: [{
      test: /\.(scss|sass)$/,
      include: STYLE_PATH,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  devServer: {
    port,
    publicPath,
    contentBase: path.resolve(__dirname, '../bundle'),
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
})