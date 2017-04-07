import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
}

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
        <h2 style={styles.headline}>Tab One</h2>
        <p>
          This sis an example tab.
        </p>
        <p>
          You can put any sort of HTML or react component in here. It even keeps the component state!
        </p>
        <Slider name='slider0' defaultValue={0.5} />
      </div>
    </Tab>
    <Tab label='top up' value='top up' onClick={() => {
      state.tab = 'top up'
    }}>
      <div>
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
))

export default Wallet
