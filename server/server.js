const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)
const app = require('koa')()
const router = require('koa-router')()
const koaBody = require('koa-body')()

app.use(koaBody)

router.post('/users', async () => {
  const {body} = this.request

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

  this.body = JSON.stringify(chargeRes)
})

app.use(router.routes())

app.listen(process.env.PORT)
