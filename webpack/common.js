const path = require('path');

const publicPath = '/';
const srcPath = './src';

const webpackConfig = {
  entry: {
    oneForAll: [
      path.resolve(path.resolve(__dirname, '..'), path.resolve(srcPath, 'oneForAll/index.js'))
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    filename: '[name].bundle.min.js',
    path: path.resolve(path.resolve(__dirname, '..'), 'dist/'),
    publicPath
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        // loaders: ['babel-loader', 'eslint-loader'],
        include: path.join(path.resolve(__dirname, '..'), srcPath)
      },
    ]
  },
};

module.exports = webpackConfig;
