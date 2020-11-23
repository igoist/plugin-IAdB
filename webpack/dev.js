const merge = require('webpack-merge');
const common = require('./common.js');
const webpack = require('webpack');
const path = require('path');

let arr = [];
let bundle;
try {
  bundle = path.resolve(__dirname, '../dist/dll/react-map.json');
} catch (e) {
  bundle = '';
}

arr.push(
  merge(common[0], {
    mode: 'development',
    devtool: 'inline-source-map'
  })
);

arr.push(
  merge(common[1], {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: bundle
      })
    ]
  })
);

module.exports = arr;
