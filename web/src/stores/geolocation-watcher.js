const geolocation = window.navigator.geolocation.watchPosition(function (position) {
  const {
      latitude,
      longitude,
      accuracy
  } = position.coords
  console.log('result' +
    'lat: ' + latitude + ', ' +
    'lng: ' + longitude + ', ' +
    'accuracy: ' + accuracy + '<br />')
},
  function (err) {
    console.error(err)
  }, {
    maximumAge: 250,
    enableHighAccuracy: true
  }
)

export default geolocation
