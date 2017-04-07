import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import StripeCheckout from 'react-stripe-checkout'
import globalStore from '../stores/global-store'
import BoundInput from '../components/bound-input'

const state = observable({
  tab: 'top up',
  topUpAmount: 200
})
@observer
class Wallet extends Component {
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
            token={(token) => {
              console.log('token', token)
            }}
            stripeKey='pk_test_74D3aKbuhEfxPvoe3HHDGKLb' />
        </div>
      </Tab>
    </Tabs>
  }
}

export default Wallet
