// production config
const merge = require('webpack-merge');
const {resolve} = require('path');
const settings = require('./settings_local')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.common');


module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, settings.dist_path),
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
