const request = require('request')
const geolocation = require('./geolocation')
const url = 'https://api.darksky.net/forecast/cd57fe79e2564946b0d85bb64c0f9f05/37.8267,-122.4233?units=si&lang=pt'

geolocation.myGeolocation('Novo Hamburgo', (err, data) => {
  console.log(err)
  console.log(data)
})