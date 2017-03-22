const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.noDeprecation = true; // for removing loader-utils dev warnings

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    widget: './widget.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/assets'
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, './src'),
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: "file-loader"
      },
      {
        test: /\.tpl.html$/,
        use: [{
          loader: 'blueimp-tmpl-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline', // Doesn't work ?
              plugins: function () {
                return [
                  require('postcss-smart-import'),
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }
        ],
      },
      {
        test: /\.css$/,
        exclude: /global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline', // Doesn't work ?
              plugins: function () {
                return [
                  require('postcss-smart-import'),
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: NODE_ENV === 'development',
      compress: {
        warnings: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Title',
      filename: '../index.html'
    })
  ],

  watch: NODE_ENV === 'development',
  devtool: NODE_ENV === 'development' ? 'source-map' : ''
};
