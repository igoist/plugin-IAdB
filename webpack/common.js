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
    alias: {
      Components: path.resolve(path.resolve(__dirname, '..'), 'src/components/'),
      Util: path.resolve(path.resolve(__dirname, '..'), 'src/util/'),
    },
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
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ]
  },
};

module.exports = webpackConfig;
