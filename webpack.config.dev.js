const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const merge = require('webpack-merge');

const baseConf = require('./webpack.config.base');

module.exports = merge(baseConf, {
  devServer: {
    publicPath: '/static/',
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    useLocalIp: true,
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/static/index.html',
    },
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  devtool: 'cheap-module-source-map',
  plugins: [new ErrorOverlayPlugin()],
});
