'use strict'

const path = require('path')
const webpack = require('webpack')

const OUTPUT_PATH = path.resolve(__dirname, 'app')
const SRC_PATH = path.resolve(__dirname, 'src')
const STYLE_PATH = path.resolve(__dirname, 'src/static')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractScss = new ExtractTextPlugin({
  filename: 'style.css'
})

const config = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/app'
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
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
        }
      },
      {
        test: /\.scss$/,
        include: STYLE_PATH,
        use: extractScss.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      miniChunks: Infinity
    }),
    extractScss,
    new webpack.optimize.UglifyJsPlugin({
      beautify: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  target: 'electron-renderer'
}

module.exports = config