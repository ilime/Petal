const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'semantic-ui-react',
      'redux',
      'axios',
      'moment'
    ],
    app: './src/entry'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
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
