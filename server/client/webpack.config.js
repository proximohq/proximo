'use strict';

const webpack = require('webpack');
const Extract = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs');
const config = require('config');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'public/dist');

// CONFIG
const configPath = path.resolve(__dirname, 'public/dist/config.json');
fs.writeFileSync(configPath, JSON.stringify(config));
//

const extractCss = new Extract('styles.css');
let cssLoader;
let sourcemap;
let plugins = [
  extractCss
  // new webpack.NoEmitOnErrorsPlugin(),
];

if (process.env.ENV === 'production') {
  cssLoader = extractCss.extract([
    'css-loader',
    'sass-loader'
  ]);
  sourcemap = 'source-map';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
} else {
  cssLoader = 'style-loader!css-loader!sass-loader';
  sourcemap = 'inline-source-map';
}

module.exports = {
  entry: path.join(SRC_DIR, 'app.js'),
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: cssLoader,
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|eot|woff2?)(\?v=.*)?$/,
        loader: 'file-loader',
        query: {
          name: '../fonts/[name].[ext]'
        }
      },
      {
        test: /fonts\/.*\.svg(\?v=.*)?$/,
        loader: 'file-loader',
        query: {
          name: '../fonts/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '../images/[name].[ext]'
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /node_modules/
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  },
  resolve: {
    alias: {
      config: configPath
    }
  },
  plugins: plugins,
  stats: {
    colors: true
  },
  devtool: sourcemap
};
