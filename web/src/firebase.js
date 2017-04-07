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

export const login = (user) => {
  const {uid, displayName, email, photoURL} = user
  window.localStorage.setItem(storageKey, uid)
  db.ref('/users').child(uid).set({
    isOnline: true,
    displayName,
    email,
    photoURL
  })
  store.profile = user
}

export const logout = () => {
  window.localStorage.removeItem(storageKey)

  if (store.profile) {
    db.ref('/users').child(store.profile.uid).update({
      isOnline: false
    })
    auth.signOut()
      .then(store.reset)
      .catch((message) => console.error('logout error: ', message))
  }
}

export const setUserOffline = () => {
  if (!store.profile) return false
  db.ref('/users').child(store.profile.uid).update({
    isOnline: false
  })
}

window.onbeforeunload = setUserOffline
