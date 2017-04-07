import Koa from 'koa'
import send from 'koa-send'
import React from 'react'
import ReactDOMStream from 'react-dom-stream/server'
import {match, RouterContext} from 'react-router'
import {router} from './src/routes'
import koaStatic from 'koa-static'
import koaLogger from 'koa-logger'
import path from 'path'

import renderIndex from './render-index'

const app = new Koa()
app.use(koaLogger())
app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

app.use(koaStatic(path.join(__dirname, '/static')))

const matchPromisified = (ctx) => {
  return new Promise(function (resolve, reject) {
    // const search = '?' + ctx.request.url.split('?')[1]

    match({ routes: router, location: ctx.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        // ctx.status = 500
        // ctx.body = error.message
        return reject(error)
      } else if (redirectLocation) {
        ctx.status = 302
        ctx.redirect(redirectLocation.pathname + redirectLocation.search)
        resolve(true)
      } else if (renderProps) {
        ctx.status = 200

        const appStream = ReactDOMStream.renderToString(<RouterContext {...renderProps} />)
        ctx.body = renderIndex(appStream, true)
        ctx.type = 'text/html'
        resolve(true)
      }
      resolve(false)
    })
  })
}

if (process.env.NODE_ENV === 'production') {
  app.use(async function (ctx, next) {
    const matched = await matchPromisified(ctx)
    if (!matched) {
      await send(ctx, ctx.path, {root: __dirname})
    }
  })
}

export default app
