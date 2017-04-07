require('localstorage-polyfill')
require('dotenv').config()
const webpack = require('webpack')
const reqSubstitution = require('require-substitution')
reqSubstitution.add((path) => {
  if (path.endsWith('.css') || path.endsWith('.scss')) {
    return null
  }
})
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

require('babel-register')
const jsdom = require('jsdom')
const domStr = '<!doctype html><html><body></body></html>'
const doc = jsdom.jsdom(domStr)
const win = doc.defaultView
global.document = doc
global.window = win
global.navigator = {
  userAgent: 'node.js'
}

const server = require('./react-server-side')
const PORT = process.env.PORT || 4001
const USE_HTTPS = process.env.USE_HTTPS !== 'false'

if (process.env.NODE_ENV !== 'production') {
  const renderIndex = require('./render-index').default

  const devServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    https: USE_HTTPS,
    hot: true,
    contentBase: './static',
    historyApiFallback: true,
    stats: { colors: true },
    setup (app) {
      app.use(function (req, res, next) {
        if (req.path.includes('.')) {
          return next()
        }
        renderIndex('').pipe(res)
      })
    }
  })
  devServer.listen(PORT, function (err, result) {
    if (err) {
      return console.log(err)
    }

    console.log(`Listening at ${USE_HTTPS ? 'https' : 'http'}://localhost:${PORT}/`)
  })
} else {
  server.default.listen(PORT)
}
