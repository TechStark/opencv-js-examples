const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const { ifProduction, ifDevelopment } = getIfUtils(NODE_ENV);

module.exports = {
  mode: NODE_ENV,
  entry: {
    app: removeEmpty(['./src/index.js'])
  },
  output: {
    path: path.join(__dirname, 'build/dist'),
    filename: '[name].js'
  },

  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },

  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: removeEmpty([
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    ifDevelopment(new ReactRefreshWebpackPlugin()),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      minify: false,
      hash: false
    })
  ]),

  devtool: ifDevelopment('source-map'),

  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000
  }
};
