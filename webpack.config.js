var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  // devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/main.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style!css!'
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }, { // image loader - https://www.npmjs.com/package/image-webpack-loader
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  }
};
