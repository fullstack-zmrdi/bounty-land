 /* @flow */
import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as firebase from 'firebase'

import { registerScreens } from './scenes'
import Auth from './auth'
import { firebaseConfig } from './config'

// $FlowFixMe: this is just development option
console.disableYellowBox = true

// Register scenes
registerScreens()

class App {
  constructor () {
    console.log('app constructor')
    this.authData = {}

    Auth.getAuthData()
    .then((authData) => {
      console.log('initial auth data', authData)
      this.authData = authData
      this.startApp(authData)
    })

    Auth.listenAuthChange((authData) => {
      console.log('auth change', authData)

      if (!this.authData || (this.authData.isAuthenticated !== authData.isAuthenticated)) {
        this.startApp(authData)
      }
    })

    this.initFirebase()
  }

  /**
   * Start app
   */
  startApp (authData) {
    if (!authData || !authData.isAuthenticated) {
      console.log('start app dont have user')
      this.startAppAsUnauthenticatedUser()
    } else {
      console.log('start app have user', authData)
      this.startAppAsAuthenticatedUser(authData)
    }
  }

  /**
   * Start app as authenticated user
   */
  startAppAsAuthenticatedUser (authData) {
    if (Platform.OS === 'ios') {
      console.log('start ios')
      this.startAppAsAuthenticatedUserIos(authData)
    } else {
      console.log('start android')
      this.startAppAsAuthenticatedUserAndroid(authData)
    }
  }

  /**
   * Start app as unauthenticated user
   */
  startAppAsUnauthenticatedUser () {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'HOME',
        title: 'Bounty Land'
      }
    })
  }

  /**
   * Start as authenticated user ios
   */
  startAppAsAuthenticatedUserIos (authData) {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Map',
          screen: 'HOME',
          icon: require('./images/ios_maps.png'),
          title: 'Map'
        },
        {
          label: 'Challenges',
          screen: 'CHALLENGES',
          icon: require('./images/ios_turns.png'),
          title: 'Challenges'
        },
        {
          label: 'Profile',
          screen: 'PROFILE',
          icon: require('./images/ios_contacts.png'),
          title: 'Profile'
        },
        {
          label: 'Wallet',
          screen: 'WALLET',
          icon: require('./images/ios_top_charts.png'),
          title: 'Wallet'
        }
      ],
      tabsStyle: {},
      appStyle: { orientation: 'portrait' },
      passProps: { authData },
      animationType: 'slide-down'
    })
  }

  /**
   * Start as authenticated user android
   */
  startAppAsAuthenticatedUserAndroid (authData) {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'HOME',
        title: 'LBC'
      },
      drawer: {
        left: {
          screen: 'DRAWER'
        }
      },
      passProps: { authData }
    })
  }

  /**
   * Init firebase
   */
  initFirebase () {
    console.log('init firebase')
    firebase.initializeApp(firebaseConfig)
  }
}

export default App
