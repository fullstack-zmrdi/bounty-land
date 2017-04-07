import _ from 'lodash'
let runningWatch

export default (cb) => {
  runningWatch = window.navigator.geolocation.watchPosition(function (position) {
    const coords = _.pick(position.coords, ['latitude', 'longitude', 'accuracy'])
    cb(coords)
  },
    function (err) {
      console.error(err)
    }, {
      maximumAge: 250,
      enableHighAccuracy: true
    }
  )
  return () => {
    window.navigator.geolocation.clearWatch(runningWatch)
  }
}
