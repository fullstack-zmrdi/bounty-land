import { DeviceEventEmitter } from 'react-native' //eslint-disable-line

class Auth {
  constructor () {
    this.emitter = DeviceEventEmitter
  }

  listenAuthChange (callback) {
    this.emitter.addListener('authChange', (data) => callback(data))
  }

  dispatchAuthChange (object) {
    this.emitter.emit('authChange', object)
  }
}

export default new Auth()