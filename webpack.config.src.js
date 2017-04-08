'use strict'

const path = require('path')

const OUTPUT_PATH = path.resolve(__dirname, 'bundle')
const SRC_PATH = path.resolve(__dirname, 'src')

const config = {
  entry: {
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
          presets: ['es2015', 'react'],
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        include: SRC_PATH,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports = config