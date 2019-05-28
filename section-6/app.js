const request = require('request')
const { myGeolocation, myForecast } = require('./utils')
const city = process.argv[2]

if (!city) {
  return console.error('Please, provide a city')
}

myGeolocation(city, (err, gData) => {
  if (err) {
    return console.error(err)
  }

  myForecast(gData.lat, gData.lng, (err, fData) => {
    if (err) {
      return console.error(err)
    }

    console.log(gData.location)
    console.log(fData)
  })
})