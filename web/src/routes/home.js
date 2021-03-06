/* global google */

import React, { Component } from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import {Link} from 'react-router-dom'
import Map, {Marker} from 'google-maps-react'
import Async from 'react-promise'
import {db} from '../firebase'
import {FloatingActionButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import globalStore from '../stores/global-store'

@observer
class Home extends Component {
  @observable users = []
  @observable challenges = []
  componentDidMount () {
    globalStore.title = 'Map'
  }
  componentWillMount () {
    db.ref('/users').on('value', (users) => {
      console.log('novy hodnoty')
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
      .filter(({coords, isOnline, logged, lastTimeOnline}) => {
        return coords && logged && lastTimeOnline && (new Date() - new Date(lastTimeOnline)) <= (60 * 1000)
      })
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
      <div>
        <Link to='/add'>
          <FloatingActionButton style={{
            position: 'fixed',
            right: 40,
            bottom: 40,
            zIndex: 30
          }}>
          <ContentAdd />
        </FloatingActionButton>
        </Link>

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
      </div>
    )
  }
}

export default Home
