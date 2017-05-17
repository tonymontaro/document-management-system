const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: path.resolve(__dirname, 'client/index'),
  target: 'web',
  output: {
    path: __dirname + '/lib/client',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './lib/client')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel']},
      {test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css', 'autoprefixer', 'sass'])},
      {test: /\.json$/, loader: 'json'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
