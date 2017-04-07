require('dotenv').config()
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const koaBody = require('koa-body')()

app.use(koaBody)

router.post('/charge', async (ctx) => {
  const {body} = ctx.request

  console.log(body)
  // => POST body
  const customer = await stripe.customers.create({
    email: body.stripeEmail,
    source: body.stripeToken
  })

  const chargeRes = await stripe.charges.create({
    amount: body.amount,
    description: 'bounty land',
    currency: 'czk',
    customer: customer.id
  })

  ctx.body = JSON.stringify(chargeRes)
})

app.use(router.routes())

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})
