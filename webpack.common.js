// shared config (dev and prod)

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
1
const devMode = process.env.NODE_ENV !== 'production'
const pages = require('./pages')
const settings = require('./settings_local')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    main: [
      './index.js',
    ],
  },
  context: resolve(__dirname, settings.src_path),
  module: {
    rules: [

      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'sass-loader',
        ],
      },

      {
        test: /\.less$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },

      {
        test: /\.html$/,
        use: [

          {
            loader: "html-loader",
            options: {
              minimize: false,
            }
          },
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        compress: true
      }
    }),
    new VueLoaderPlugin(),
    ...pages,
  ],
  performance: {
    hints: false,
  },
};