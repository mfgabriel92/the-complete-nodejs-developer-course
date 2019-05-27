const request = require('request')

const myGeolocation = (cityName, callback) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityName)}.json?access_token=pk.eyJ1IjoibWZnYWJyaWVsIiwiYSI6ImNqdzZ2bzMyMTI3dWMzeXBnNHh2eGN6ZDIifQ.nHySeETJMH05HdzDetWduw&limit=1`

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback(err)
      return
    }

    if (res.body.features.length === 0) {
      callback('Another error has happened')
      return
    }

    const { center, place_name } = res.body.features[0]
    const data = {
      lat: center[1],
      lng: center[0],
      location: place_name
    }

    callback(undefined, data)
  })
}

module.exports = {
  myGeolocation
}