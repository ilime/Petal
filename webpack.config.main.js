const path = require('path')

const OUTPUT_PATH = path.resolve(__dirname, '')

const config = {
  entry: {
    main: './main.dev'
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js'
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
  target: 'electron-main',
  node: {
    __dirname: false
  }
}

module.exports = config