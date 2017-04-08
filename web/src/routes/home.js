import React, { Component } from 'react'
import {observer} from 'mobx-react'
import Map, {Marker} from 'google-maps-react'
import Async from 'react-promise'

@observer
class Home extends Component {
  render () {
    return (
      <Async promise={window.gmapsPromise} before={() => {
        return <div />
      }} then={() => {
        return <Map google={window.google} zoom={14} className='map'>
          <Marker onClick={(ev) => {

          }} position={{lat: 37.759703, lng: -122.428093}}
            name={'Current location'} />
        </Map>
      }} />
    )
  }
}

export default Home
