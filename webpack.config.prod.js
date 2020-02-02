const path = require('path');
const merge = require('webpack-merge');

const baseConf = require('./webpack.config.base');

module.exports = merge(baseConf, {
  output: {
    publicPath: '/static/',
    filename: 'js/[hash].main.js',
    path: path.resolve(__dirname, 'dist'),
  },
});
