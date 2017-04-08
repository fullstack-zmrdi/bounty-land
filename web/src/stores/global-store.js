import {
  extendObservable
} from 'mobx'
// import moment from 'moment'
import mobxStored from 'mobx-stored'
import './geolocation-watcher'

const defaultState = {
  token: null,
  profile: null,
  alerts: [],
  tokenCreatedAt: null,
  lastVisitedProfiles: [],
  menuIsOpen: false
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
