const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/entry'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        helper: {
          test: /[\\/]src[\\/]helper[\\/]/,
          minSize: 0
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        reactVendor: {
          test: module => /react/.test(module.context),
          priority: 1
        }
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Petal',
      template: './src/template/index.pug'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: 'electron-renderer'
}
