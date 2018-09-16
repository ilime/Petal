const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./config.base')
const DEV_OUTPUT_PATH = path.resolve(__dirname, '../bundle')
const SRC_PATH = path.resolve(__dirname, '../src')
const STYLE_PATH = path.resolve(__dirname, '../src/styles')
const port = 3000
const publicPath = `http://localhost:${port}/bundle/`

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: DEV_OUTPUT_PATH,
    filename: '[name].bundle.js',
    publicPath
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
              plugins: [
                require('@babel/plugin-proposal-class-properties'),
                'react-hot-loader/babel'
              ],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: STYLE_PATH,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    port,
    publicPath,
    contentBase: path.resolve(__dirname, '../bundle'),
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})

module.exports = devConfig
