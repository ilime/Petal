const path = require('path')

const MAINJS_OUTPUT_PATH = path.resolve(__dirname, '../public')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './electron/main.dev',
    background: './electron/background'
  },
  output: {
    path: MAINJS_OUTPUT_PATH,
    filename: '[name].js'
  },
  target: 'electron-main',
  node: {
    __dirname: false
  }
}
