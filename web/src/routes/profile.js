import React from 'react'
import {observer} from 'mobx-react'
import store from '../stores/global-store'

const Profile = observer(() => (
  <div>
    <h2>Profile</h2>
    <span>{JSON.stringify(store.profile)}</span>
  </div>
))

export default Profile
