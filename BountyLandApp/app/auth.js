import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk'
import { AsyncStorage, DeviceEventEmitter, Platform } from 'react-native' //eslint-disable-line

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

  getFacebookUserProfile () {
    return new Promise((resolve, reject) => {
      const req = new GraphRequest('/me', {
        parameters: {
          'fields': {
            'string': 'email,name,friends,picture'
          }
        }
      }, (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
      new GraphRequestManager().addRequest(req).start()
    })
  }

  signInFacebook () {
    // FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native) // defaults to Native
    const authData = { isAuthenticated: true, type: 'facebook', user: {} }
    LoginManager.logInWithReadPermissions(['email', 'user_friends', 'public_profile'])
    .then((result) => {
      if (result.isCancelled) {
        console.log('facebook sign in cancelled', result)
        throw new Error('User cancelled login')
      } else {
        console.log('facebook sign in', result)
        authData.loginResult = result
        return AccessToken.getCurrentAccessToken()
      }
    })
    .then((token) => {
      authData.token = token
      return this.getFacebookUserProfile()
    })
    .then((user) => {
      authData.user = user
      this.setAuthData(authData)
      .then(() => {
        this.dispatchAuthChange(authData)
      })
    })
    .catch((err) => {
      console.log('facebook sign in err', err)
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
      const authData = { isAuthenticated: true, type: 'google', user }
      this.setAuthData(authData)
      .then(() => {
        this.dispatchAuthChange(authData)
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
        const _authData = { isAuthenticated: false, type: 'unknown' }
        this.setAuthData(_authData)
        .then(() => {
          this.dispatchAuthChange(_authData)
        })
      }

      console.log('auth data', authData)

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
    LoginManager.logOut()
    const authData = { isAuthenticated: false, type: 'facebook' }
    this.setAuthData(authData)
    .then(() => {
      this.dispatchAuthChange(authData)
    })
  }

  signOutGoogle () {
    GoogleSignin.signOut()
    .then(() => {
      console.log('google sign out succ')
      const authData = { isAuthenticated: false, type: 'google' }
      this.setAuthData(authData)
      .then(() => {
        this.dispatchAuthChange(authData)
      })
    })
    .catch((err) => {
      console.log('google sign out err', err)
    })
  }
}

export default new Auth()
