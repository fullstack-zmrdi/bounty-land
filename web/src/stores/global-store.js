import {
  extendObservable
} from 'mobx'
// import moment from 'moment'
import mobxStored from 'mobx-stored'
import {db} from '../firebase'
import './geolocation-watcher'

console.log(db)

const defaultState = {
  token: null,
  profile: null,
  alerts: [],
  tokenCreatedAt: null,
  lastVisitedProfiles: []
}

const globalStore = mobxStored(`globalStore`, defaultState)

globalStore.extend = (value) => {
  extendObservable(globalStore, value)
}

globalStore.isUserLogged = () => {
  return !!globalStore.token
}

export default globalStore

window.globalStore = globalStore
