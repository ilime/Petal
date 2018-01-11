const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BaseConfig = require('./config.base')
const PROD_OUTPUT_PATH = path.resolve(__dirname, '../app')
const STYLE_PATH = path.resolve(__dirname, '../src/static')
const APP_SYMBOL = 'Petal'

module.exports = merge.smart(BaseConfig, {
  output: {
    path: PROD_OUTPUT_PATH,
    filename: `[name].[chunkhash].${APP_SYMBOL}.js`
  },
  module: {
    rules: [{
      test: /\.scss$/,
      include: STYLE_PATH,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `style.${APP_SYMBOL}.css`,
      allChunks: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        output: {
          beautify: false,
          comments: false
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
