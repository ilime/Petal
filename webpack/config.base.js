const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/entry'
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
