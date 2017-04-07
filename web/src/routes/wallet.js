import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import StripeCheckout from 'react-stripe-checkout'

const state = observable({
  tab: 'top up'
})

const Wallet = observer(() => (
  <Tabs value={state.tab} onChange={(tab) => {
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
        <StripeCheckout
          token={(token) => {

          }}
          stripeKey='pk_test_74D3aKbuhEfxPvoe3HHDGKLb' />
      </div>
    </Tab>
  </Tabs>
))

export default Wallet
