// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const fs = require('fs');
const settings = require('./settings_local')
const address = require('ip').address();

fs.writeFile(settings.dist_path+'/hot', address,()=>{});
module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    headers: {"Access-Control-Allow-Origin": "*"},
    host: address,
    overlay: true,
  },
  output: {
    filename: '[name].js',
    publicPath: 'http://'+address+':8080/dist/'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});
