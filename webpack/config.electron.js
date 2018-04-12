const path = require('path')

const MAINJS_DEV_OUTPUT_PATH = path.resolve(__dirname, '../bundle')
const MAINJS_PROD_OUTPUT_PATH = path.resolve(__dirname, '../app')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './electron/main.dev'
  },
  output: {
    path: isProd ? MAINJS_PROD_OUTPUT_PATH : MAINJS_DEV_OUTPUT_PATH,
    filename: '[name].js'
  },
  target: 'electron-main',
  node: {
    __dirname: false
  }
}
