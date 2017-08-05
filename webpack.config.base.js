/**
 * Base webpack config used across other specific configs
 */

import path from 'path'
import validate from 'webpack-validator'

import { dependencies as externals } from './app/package.json'

export default validate({
  module: {
    noParse: [/ajv.bundle.js$/],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        include: path.resolve('./app/Elements/icons'),
        loaders: [
          'svg-sprite-loader?' +
            JSON.stringify({
              name: '[name].[hash]',
              prefixize: true
            }),
          'svgo-loader?' +
            JSON.stringify({
              plugins: [
                { removeTitle: true },
                { removeUselessStrokeAndFill: false },
                { convertPathData: false }
              ]
            })
        ]
      }
    ]
  },

  output: {
    path: path.resolve('./app'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: [
      'webpack',
      'browser',
      'web',
      'browserify',
      ['jam', 'main'],
      'main'
    ],
    modulesDirectories: [path.resolve('./app'), 'node_modules'],
    alias: {
      CoreStyles: path.resolve('./app/Styles'),
      Elements: path.resolve('./app/Elements'),
      Icons: path.resolve('./app/Elements/icons'),
      Resources: path.resolve('./resources')
    }
  },

  plugins: [],

  externals: Object.keys(externals || {}),
  stats: false,
  progress: true
})
