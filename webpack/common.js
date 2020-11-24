const merge = require('webpack-merge');
const path = require('path');

const publicPath = '/';
const srcPath = './src';

const webpackConfig = [
  {
    entry: {
      background: [path.resolve(path.resolve(__dirname, '..'), path.resolve(srcPath, 'background.js'))],
    },
  },
  {
    entry: {
      oneForAll: [path.resolve(path.resolve(__dirname, '..'), path.resolve(srcPath, 'oneForAll/index.js'))],
      zhihu: [path.resolve(path.resolve(__dirname, '..'), path.resolve(srcPath, 'zhihu.js'))],
    },
  },
];

let arr = [];

for (let i = 0; i < webpackConfig.length; i++) {
  arr.push(
    merge(webpackConfig[i], {
      resolve: {
        alias: {
          '@Components': path.resolve(path.resolve(__dirname, '..'), 'src/components/'),
          '@Utils': path.resolve(path.resolve(__dirname, '..'), 'src/utils/'),
        },
        extensions: ['.js', '.jsx'],
      },

      output: {
        filename: '[name].bundle.min.js',
        path: path.resolve(path.resolve(__dirname, '..'), 'dist/js/'),
        publicPath,
      },

      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
            // loaders: ['babel-loader', 'eslint-loader'],
            include: path.join(path.resolve(__dirname, '..'), srcPath),
          },
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
          },
        ],
      },
    })
  );
}

module.exports = arr;
