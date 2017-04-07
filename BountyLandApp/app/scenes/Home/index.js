import React, {Component} from 'react'

import { View, StyleSheet, InteractionManager, Slider, Platform } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import MapView from 'react-native-maps'
import colors from 'material-colors'
import * as firebase from "firebase"
import map from 'lodash/map'

import plusIcon from '../../images/ic_add_white_24dp.png'
import searchIcon from '../../images/ic_search_black_24dp.png'
import doneIcon from '../../images/ic_save_white_24dp.png'

const navigatorButtons = {

}

class Home extends Component {
  static navigatorStyle = {
    ...Platform.select({
      ios: { },
      android: {
        navBarTranslucent: true,
        navBarTransparent: true,
        navBarButtonColor: 'red',
        drawUnderNavBar: true,
        topBarElevationShadowEnabled: false,
      }
    })
  }

  static navigatorButtons = {
    ...Platform.select({
      ios: {
        rightButtons: [{
          id: 'add_challenge',
          icon: searchIcon,
          title: 'add_challenge',
          hint: 'ttest',
          label: 'test'
        }]
      },
      android: {
        fab: {
          collapsedId: 'add_challenge',
          collapsedIcon: plusIcon,
          backgroundColor: colors.red['500']
        },
        leftButtons: [{
          id: 'sideMenu'
        }],
        rightButtons: [{
          id: 'searchView',
          icon: searchIcon,
          hint: 'search_challenges'
        }]
      }
    })
  }

  state = {
    position: {},
    selectLocation: false,
    challengeData: {},
    selectedLocation: {
      latitude: 37.78825,
      longitude: -122.4324
    },
    selectedLocationRadius: 50,
    challenges: [],
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      firebase.database().ref('/challenges').on('value', (snapshot) => {
        this.setState({ challenges: snapshot.val() })
        console.log(snapshot.val())
      })
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
      /*
       navigator.geolocation.getCurrentPosition((pos) => {
       console.log(pos)
       this.setState({ position: pos })
       }, error => console.error(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })
       */
    })
  }

  /**
   * Handle navigator event
   */
  onNavigatorEvent (event: Object): void {
    // console.log(event)
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'add_challenge') {
        const screen = {
          screen: 'ADD_CHALLENGE',
          passProps: { selectLocation: (challengeData) => this.selectLocationForChallenge(challengeData)},
          style: {
            backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          }
        }
        if (Platform.OS === 'ios'){
          this.props.navigator.showLightBox(screen)
        }else{
          this.props.navigator.showModal(screen)
        }
      }

      if (event.id === 'save_challenge') {
        this.saveChallenge()
      }
    }
  }

  selectLocationForChallenge (challengeData) {
    console.log(challengeData)
    this.props.navigator.dismissModal()
    this.props.navigator.setTitle({ title: 'select_location' })
    this.props.navigator.setButtons({
      ...navigatorButtons,
      fab: {
        collapsedId: 'save_challenge',
        collapsedIcon: doneIcon,
        backgroundColor: colors.red['500']
      }
    })
    this.setState({ challengeData, selectLocation: true })
  }

  onMapPress ({ coordinate }) {
    console.log('map press', coordinate)
    if (this.state.selectLocation) {
      this.setState({
        selectedLocation: coordinate,
        region: { ...this.state.region, ...coordinate }
      })
    }
  }

  saveChallenge () {
    firebase.database()
      .ref('challenges/' + Date.now())
      .set({
        ...this.state.challengeData,
        location: {
          ...this.state.selectedLocation,
          radiusInMeters: this.state.selectedLocationRadius
        }
      })
      .then(() => this.props.navigator.showSnackbar({ text: 'challenge_published'}))
      .catch((err) => this.props.navigator.showSnackbar({ text: err.message}))

    this.props.navigator.setTitle('')
    this.props.navigator.setButtons({
      ...navigatorButtons
    })

    this.setState({ selectLocation: false, challengeData: {} })
  }

  updateRegion (newRegion) {
    this.setState({ ...this.state.region, newRegion })
  }

  openChallengeDetail (challenge) {
    this.props.navigator.showModal({
      screen: 'CHALLENGE_DETAIL',
      passProps: { challenge }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView
          onPress={(data) => this.onMapPress(data.nativeEvent)}
          style={styles.map}
          region={this.state.region}>
          {this.state.selectLocation
            ? (
              [
                <MapView.Circle
                  key={0}
                  center={this.state.selectedLocation}
                  radius={this.state.selectedLocationRadius}
                  fillColor={'rgba(0,0,0,.3)'}
                  strokeWidth={0} />,
                <MapView.Marker
                  key={1}
                  coordinate={this.state.selectedLocation} />
              ]

            ) : (
              map(this.state.challenges, (challenge) => (
                <MapView.Marker
                  onPress={() => this.openChallengeDetail(challenge)}
                  coordinate={{ latitude: challenge.location.latitude, longitude: challenge.location.longitude}}
                  title={challenge.name}
                  description={challenge.description} />
              ))
            )}
        </MapView>
        {this.state.selectLocation
          ? (
            <View style={{ alignSelf: 'flex-start', borderRadius: 2, elevation: 4, paddingVertical: 8, backgroundColor: colors.white, margin: 16 }}>
              <Text style={{ paddingHorizontal: 16 }}>{'area_radius'} {this.state.selectedLocationRadius}m</Text>
              <Slider
                style={{ width: 200 }}
                step={5}
                maximumValue={1000}
                minimumValue={10}
                onSlidingComplete={(value) => this.setState({ selectedLocationRadius: value })} />
            </View>
          ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
})

export default Home
