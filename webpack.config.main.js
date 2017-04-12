'use strict'

const path = require('path')

const OUTPUT_PATH = path.resolve(__dirname, 'bundle')

const config = {
  entry: {
    main: './main.dev'
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  target: 'electron',
  node: {
    __dirname: false,
    __filename: false
  },
}

module.exports = config