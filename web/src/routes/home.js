import React from 'react'
import {observer} from 'mobx-react'
import store from '../stores/global-store'

const Home = observer(() => (
  <div>
    <h2>Home</h2>
    <span>{JSON.stringify(store.profile)}</span>
  </div>
))

export default Home
