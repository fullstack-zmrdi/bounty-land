/* global localStorage */

import firebase from 'firebase'
import store from './stores/global-store'

let config = {
  apiKey: 'AIzaSyATqCqBIQKq57sq7537U_qFV-zB8aB0Dpw',
  authDomain: 'bountyland-e8773.firebaseapp.com',
  databaseURL: 'https://bountyland-e8773.firebaseio.com',
  projectId: 'bountyland-e8773',
  storageBucket: 'bountyland-e8773.appspot.com',
  messagingSenderId: '761636885148'
}

export const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.database()
export const auth = firebaseApp.auth()

export const storageKey = 'FIREBASE_AUTH'

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey)
}

export const facebookProvider = new firebase.auth.FacebookAuthProvider()

export const setUser = (user) => {
  store.profile = user
}
