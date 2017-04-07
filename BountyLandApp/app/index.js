 /* @flow */
import { DeviceEventEmitter, Platform, AsyncStorage } from 'react-native'
// import I18n from 'react-native-i18n'
// import codePush from 'react-native-code-push'
import { Navigation } from 'react-native-navigation'
import * as firebase from 'firebase'

import { registerScreens } from './scenes'
// import czechTranslations from './locales/cs'
// import englishTranslations from './locales/en'

import { colors } from './const'
import Auth from './auth'

const DEFAULT_LOCALE = I18n.locale.split('-')[0]
const handleMissing = (scope) => `${scope || 'unknown'}`

// $FlowFixMe: this is just development option
console.disableYellowBox = true

// Register scenes
registerScreens()

class App {
  constructor () {
    // store.subscribe(() => this.onStoreUpdate())
    this.auth = Auth
    AsyncStorage.getItem('auth')
    .then((auth) => {
      const authData = JSON.parse(auth)
      this.startApp(authData)
    })

    this.auth.listenAuthChange((data) => {
      AsyncStorage.setItem('auth', JSON.stringify(data))
      .then(() => {
        this.startApp(data)
      })
      .catch((err) => {
        console.log('failed to start app', err)
      })
    })

    this.initFirebase()
    // this.syncCodePushAndStartApp(authenticated)
    this.handleOrientationChange()
    this.configureI18n()
  }

  startApp (authData) {
    if (!authData || !authData.isAuthenticated) {
      console.log('start have user', authData)
      this.startAppAsAuthenticatedUser()
    } else {
      console.log('start dont have user')
      this.startAppAsUnauthenticatedUser()
    }
  }

  initFirebase () {
    firebase.initializeApp()
  }


  /**
   * Set i18n locale
  setLocale (locale: string) {
    // console.log(locale)
    I18n.locale = locale
  }
   */

  /**
   * Configure i18n
  configureI18n () {
    I18n.fallbacks = true
    I18n.default_locale = DEFAULT_LOCALE
    I18n.available_locales = ['cs', 'en']
    I18n.translations = {
      cs: czechTranslations,
      de: englishTranslations
    }
    I18n.missingTranslation = handleMissing
    I18n.missingPlaceholder = handleMissing
  }
*/


  /**
   * Check device type and start app
   */
  startApp (authenticated: boolean, codePushSyncResult: any) {
    // Breaks our recycler views
    // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    // console.log('code push synced', codePushSyncResult)

    // console.log('is tablet ', isTablet)
    if (authenticated) {
      this.startAppAsAuthenticatedUser()
    } else {
      this.startAppAsUnauthenticatedUser()
    }
  }

  /**
   * Start app as authenticated user
   */
  startAppAsAuthenticatedUser () {
    if (Platform.OS === 'ios') {
      Navigation.startTabBasedApp({
        tabs: [
          {
            label: 'Map', // tab label as appears under the icon in iOS (optional)
            screen: 'HOME', // unique ID registered with Navigation.registerScreen
            icon: require('./images/ios_maps.png'), // local image asset for the tab icon unselected state (optional on iOS)
            selectedIcon: require('./images/ios_maps.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)
            title: 'Map', // title of the screen as appears in the nav bar (optional)
 // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
         // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
          },
          {
            label: 'Challenges',
            screen: 'CHALLENGES',
            icon: require('./images/ios_turns.png'),
            selectedIcon: require('./images/ios_turns.png'),
            title: 'Challenges'
          },
          {
            label: 'Profile',
            screen: 'PROFILE',
            icon: require('./images/ios_contacts.png'),
            selectedIcon: require('./images/ios_contacts.png'),
            title: 'Profile'
          },
          {
            label: 'Wallet',
            screen: 'WALLET',
            icon: require('./images/ios_top_charts.png'),
            selectedIcon: require('./images/ios_top_charts.png'),
            title: 'Wallet'
          }
        ],
        tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults

        },
        appStyle: {
          orientation: 'portrait' // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
        },
        passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
        animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
      })
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'HOME',
          title: 'LBC'
        },
        drawer: {
          left: {
            screen: 'DRAWER'
          }
        }
      })
    }
  }

  /**
   * Start app as unauthenticated user
   */
  startAppAsUnauthenticatedUser () {

      Navigation.startSingleScreenApp({
        screen: {
          screen: 'SIGN_IN',
          title: 'LBC'
        }
      })
  }
}

export default App
