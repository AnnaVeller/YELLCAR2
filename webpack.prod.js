const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const base = require('./webpack.dev')
const { merge } = require('webpack-merge')

module.exports = merge(base, {
  mode: 'production',
  devtool: '',
  performance: {
    maxEntrypointSize: 9000000,
    maxAssetSize: 9000000,
  },
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
    }),

    new webpack.ProgressPlugin(),
  ],
})
