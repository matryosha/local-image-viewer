const path = require('path');
const merge = require('webpack-merge');

const baseConf = require('./webpack.config.base');

module.exports = merge(baseConf, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    useLocalIp: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
});
