const path = require('path')

const MAINJS_OUTPUT_PATH = path.resolve(__dirname, '../bundle')

module.exports = {
  entry: {
    main: './main.dev'
  },
  output: {
    path: MAINJS_OUTPUT_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true
      }
    }]
  },
  target: 'electron-main',
  node: {
    __dirname: false
  }
}