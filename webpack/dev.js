const merge = require('webpack-merge');
const common = require('./common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
});
