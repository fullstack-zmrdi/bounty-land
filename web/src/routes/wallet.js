import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import trae from 'trae'
import StripeCheckout from 'react-stripe-checkout'
import globalStore from '../stores/global-store'
import BoundInput from '../components/bound-input'
import {db} from '../firebase'

const state = observable({
  tab: 'top up',
  topUpAmount: 200,
  paymentProcessing: false
})

@observer
class Wallet extends Component {
  componentDidMount () {
    globalStore.title = 'Wallet'
  }
  render () {
    return <Tabs value={state.tab} onChange={(tab) => {
      state.tab = tab
    }}>
      <Tab label='transactions' value='transactions' onClick={() => {
        state.tab = 'transactions'
      }}>
        <div>
          trans
        </div>
      </Tab>
      <Tab label='top up' value='top up' onClick={() => {
        state.tab = 'top up'
      }}>
        <div>
          <BoundInput
            source={state}
            name='topUpAmount'
            floatingLabelText='Amount to top up'
          /><br />
          <StripeCheckout
            email={globalStore.profile.email}
            amount={state.topUpAmount * 100}
            currency={'CZK'}
            token={async (token) => {
              const {email, uid} = globalStore.profile

              state.paymentProcessing = true
              await trae.post(`${process.env.API_URL}/charge`, {
                amount: state.topUpAmount,
                stripeEmail: email,
                stripeToken: token.id
              })
              db.ref('/transactions').child(uid).push({
                amount: state.topUpAmount,
                from: 'topUp',
                to: null,
                createdAt: new Date()
              })

              state.tab = 'transaction'
            }}
            stripeKey='pk_test_74D3aKbuhEfxPvoe3HHDGKLb' />
        </div>
      </Tab>
    </Tabs>
  }
}

export default Wallet
