import {observer} from 'mobx-react'
import globalStore from '../stores/global-store'
import React, { Component } from 'react'
import {Card} from 'material-ui/Card';
@observer
class Profile extends Component {
  componentDidMount () {
    globalStore.title = 'Profile'
  }
  render () {
    const {profile} = globalStore

    return <Card>
      <h2>{profile.displayName}</h2>
      <img src={profile.photoURL} alt={profile.displayName} />
    </Card>
  }
}

export default Profile
