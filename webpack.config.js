const path = require('path');
const webpack = require('webpack');
const WebpackSystemRegister = require('webpack-system-register');

/**
 * This config will bundle dependencies and source code and prepare
 * it to be properly consumed as a plugin by grafana. Build running
 * `npm run build`
 */
module.exports = {
  entry: './module.ts',
  output: {
    path: path.resolve(__dirname),
    filename: 'module.js'
  },

  // minify and prepare for grafana consumption
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new WebpackSystemRegister({
      systemjsDeps: ['app/plugins/sdk', 'lodash', 'moment', 'angular']
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // Add the loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
};
