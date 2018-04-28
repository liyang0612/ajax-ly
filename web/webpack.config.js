var path = require('path');
var HtmlWebpackPlugin = require('webpack-html-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: '/dist'
  },
  devServer: {
    port: '9000'
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html'
      }
    )
  ]  
}