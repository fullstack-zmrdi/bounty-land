/* global google */

import React, { Component } from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import Map, {Marker} from 'google-maps-react'
import Async from 'react-promise'
import {db} from '../firebase'

@observer
class Home extends Component {
  @observable users = []
  @observable challenges = []

  componentWillMount () {
    db.ref('/users').on('value', (users) => {
      this.users = Object.values(users.val())
    })

    // db.ref('/challenges').on('value', (challenges) => {
    //   this.challenges = challenges
    // })
    // setTimeout(() => {
    //   window.gmapsPromise.then(() => {
    //     this.forceUpdate()
    //   })
    // })
  }

  render () {
    const users = this.users
      .filter(({coords}) => coords)
      .map(({coords, ...user}) => <Marker icon={{
        url: user.photoURL,
        anchor: new google.maps.Point(32, 32),
        scaledSize: new google.maps.Size(64, 64)
      }}
        onClick={(ev) => {}}
        key={user.uid}
        position={{lat: coords.latitude, lng: coords.longitude}}
        name={'Current location'} style={{
          opacity: 0.5
        }} />)
    return (
      <Async promise={window.gmapsPromise} before={() => {
        return <div />
      }} then={() => {
        return <Map
          google={window.google}
          zoom={14}
          options={{cooperative: "greedy"}}
          className='map'
          initialCenter={{
            lat: 50.08804,
            lng: 14.42076
          }}
          centerAroundCurrentLocation
        >
          {users}

        </Map>
      }} />
    )
  }
}

export default Home
