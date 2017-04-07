'use strict'
require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'API_URL': JSON.stringify(process.env.API_URL),
      'FB_APP_ID': JSON.stringify(process.env.FB_APP_ID),
      'GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)
    }
  })
]

const PORT = process.env.PORT || 4001

let entry = []
let cssConfig
let scssConfig
if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('tgm.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  ])

  cssConfig = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: ['css-loader']
    })
  }

  scssConfig = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: ['css-loader', 'sass-loader']
    })
  }
} else {
  entry = entry.concat([
    `webpack-dev-server/client?https://localhost:${PORT}`,
    'webpack/hot/only-dev-server'
  ])

  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new webpack.NamedModulesPlugin())
  cssConfig = {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  }

  scssConfig = {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }
}
entry.push('babel-polyfill')
entry.push('./src/index')

module.exports = {
  devtool: 'inline-source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: plugins,
  resolve: {
    alias: {
      config: path.join(__dirname, 'config', process.env.NODE_ENV || 'development')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'es2016', 'es2017', 'stage-2', 'react'],
            plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
          }

        }],
        include: path.join(__dirname, 'src')

      },
      /* {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          limit: 10000
        }
      }, */
      cssConfig,
      scssConfig,
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
}
