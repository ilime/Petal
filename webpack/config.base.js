const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'semantic-ui-react', 'prop-types'],
    app: ['./src/app', './src/static/app.scss']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: SRC_PATH,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            'react', ['es2015', {
              modules: false
            }],
            'stage-2'
          ],
          cacheDirectory: true
        }
      }
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Petal',
      template: './src/template/index.pug'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}