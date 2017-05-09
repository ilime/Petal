'use strict'

const path = require('path')
const webpack = require('webpack')

const OUTPUT_PATH = path.resolve(__dirname, 'bundle')
const SRC_PATH = path.resolve(__dirname, 'src')
const STYLE_PATH = path.resolve(__dirname, 'src/static')

const config = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/app'
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-2'],
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        include: STYLE_PATH,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      miniChunks: Infinity
    })
  ],
  target: 'electron-renderer',
  node: {
    fs: 'empty'
  }
}

module.exports = config