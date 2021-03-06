const request = require('request')

/**
 * Fetch my coordinates and place name
 * 
 * @param {string} cityName - the name of the city to look for
 * @param {} callback - callback function
 */
const myGeolocation = (cityName, callback) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityName)}.json?access_token=pk.eyJ1IjoibWZnYWJyaWVsIiwiYSI6ImNqdzZ2bzMyMTI3dWMzeXBnNHh2eGN6ZDIifQ.nHySeETJMH05HdzDetWduw&limit=1`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback(err)
    }

    const { features } = body

    if (features.length === 0) {
      return callback('A problem has happened')
    }

    const { center, place_name } = features[0]
    const data = {
      lat: center[1],
      lng: center[0],
      location: place_name
    }

    callback(undefined, data)
  })
}

/**
 * Get the current forecast by location
 * 
 * @param {double} lat - the latitude
 * @param {double} lng - the longitude
 * @param {} callback - callback function
 */
const myForecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/cd57fe79e2564946b0d85bb64c0f9f05/${lat},${lng}?units=si&lang=pt`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback(err)
    }

    const { error, currently } = body

    if (error) {
      return callback(error)
    }

    callback(undefined, currently)
  })
}

module.exports = {
  myGeolocation,
  myForecast
}