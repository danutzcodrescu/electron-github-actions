const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  target: 'electron-main',
  entry: {
    main: './src/main.ts',
  },
  module: {
    rules: [
      {
        test: /\.node/,
        loader: 'native-ext-loader'
      },
      {
        test: /\.ts/,
        loader: 'awesome-typescript-loader'
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
});
