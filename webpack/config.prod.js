const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const baseConfig = require('./config.base')
const PROD_OUTPUT_PATH = path.resolve(__dirname, '../app')
const SRC_PATH = path.resolve(__dirname, '../src')
const STYLE_PATH = path.resolve(__dirname, '../src/styles')
const APP_SYMBOL = 'Petal'

const prodConfig = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: PROD_OUTPUT_PATH,
    filename: `[name].[chunkhash].${APP_SYMBOL}.js`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: [require('@babel/plugin-proposal-class-properties')],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: STYLE_PATH,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].${APP_SYMBOL}.css`
    }),
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin()
  ]
})

module.exports = prodConfig
