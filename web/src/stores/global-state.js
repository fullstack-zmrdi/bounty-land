/* global Profile */
import {
  extendObservable
} from 'mobx'
// import moment from 'moment'
import mobxStored from 'mobx-stored'

const defaultState = {
  token: null,
  profile: {},
  alerts: [],
  tokenCreatedAt: null,
  lastVisitedProfiles: []
}

const globalState = mobxStored(`${window.location.host}-globalState`, defaultState)

globalState.extend = (value) => {
  extendObservable(globalState, value)
}

globalState.isUserLogged = () => {
  return !!globalState.token
}

export default globalState

window.globalState = globalState
