const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [

  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
  }),
  new HtmlWebpackPlugin({
    template: './posts/posts.html',
    filename: './posts/posts.html',
  }),
  new HtmlWebpackPlugin({
    template: './posts/show.html',
    filename: './posts/show.html',
  }),
]