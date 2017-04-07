import { DeviceEventEmitter, AsyncStorage, Platform } from 'react-native' //eslint-disable-line
import { FBLoginManager } from 'react-native-facebook-login'
import { GoogleSignin } from 'react-native-google-signin'

import { googleSignIn } from './config'

class Auth {
  constructor () {
    this.emitter = DeviceEventEmitter
  }

  // utils
  listenAuthChange (callback) {
    this.emitter.addListener('authChange', (data) => callback(data))
  }

  dispatchAuthChange (object) {
    this.emitter.emit('authChange', object)
  }

  getAuthData () {
    return AsyncStorage.getItem('auth')
    .then((auth) => {
      const authData = JSON.parse(auth)
      return authData
    })
  }

  setAuthData (authData) {
    const payload = JSON.stringify(authData)
    return AsyncStorage.setItem('auth', payload)
  }

  // sign in
  signIn (loginType) {
    if (loginType === 'facebook') {
      this.signInFacebook()
    } else {
      this.signInGoogle()
    }
  }

  signInFacebook () {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native) // defaults to Native
    FBLoginManager.loginWithPermissions(['email', 'user_friends'], (error, data) => {
      if (!error) {
        console.log('facebook sign in', data)
        this.setAuthData(data)
        .then(() => {
          this.dispatchAuthChange({ isAuthenticated: true, type: 'facebook', user: data })
        })
      } else {
        console.log('facebook sign in err', error)
      }
    })
  }

  signInGoogle () {
    GoogleSignin.configure({
      iosClientId: Platform.OS === 'ios' ? googleSignIn.iosClientId : googleSignIn.webClientId // only for iOS
    })
    .then(() => {
      return GoogleSignin.signIn()
    })
    .then((user) => {
      console.log('google sign in', user)
      this.setAuthData(user)
      .then(() => {
        this.dispatchAuthChange({ isAuthenticated: true, type: 'google', user })
      })
    })
    .catch((err) => {
      console.log('google sign in err', err)
    })
  }

  // sign out
  signOut () {
    this.getAuthData()
    .then((authData) => {
      if (!authData) {
        this.dispatchAuthChange({ isAuthenticated: false, type: 'unknown' })
      }

      if (authData.type === 'facebook') {
        this.signOutFacebook()
      } else {
        this.signOutGoogle()
      }
    })
    .catch((err) => {
      console.log('sign out err', err)
    })
  }

  signOutFacebook () {
    FBLoginManager.logout((error, data) => {
      if (!error) {
        console.log('facebook sign out succ', data)
        this.dispatchAuthChange({ isAuthenticated: false, type: 'facebook', user: data })
      } else {
        console.log('facebook sign out err', error)
      }
    })
  }

  signOutGoogle () {
    GoogleSignin.signOut()
    .then(() => {
      console.log('google sign out succ')
      this.dispatchAuthChange({ isAuthenticated: false, type: 'google' })
    })
    .catch((err) => {
      console.log('google sign out err', err)
    })
  }
}

export default new Auth()
