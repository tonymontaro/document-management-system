const webpack = require('webpack');
const path = require('path');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'client/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, include: path.join(__dirname, 'client'), loaders: ['babel']},
      {test: /(\.scss)$/, loaders: ['style', 'css', 'autoprefixer', 'sass']},
      {test: /\.json$/, loader: 'json'},
      {test: /\.(jpg|png|svg)$/, loader: 'url'},
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
