const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { myGeolocation, myForecast } = require('./utils')
const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../template/views')
const partialsDir = path.join(__dirname, '../template/partials')

hbs.registerPartials(partialsDir)

app.set('view engine', 'hbs')
app.set('views', viewsDir)
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Index',
    name: 'Gabriel'
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query

  if (!address) {
    return res.send({
      code: 400,
      error: 'The address must be provided'
    })
  }

  myGeolocation(address, (err, { lat, lng, location } = {}) => {
    if (err) {
      return res.send({
        code: 400,
        err
      })
    }

    myForecast(lat, lng, (err, data) => {
      if (err) {
        return res.send({
          code: 400,
          err
        })
      }

      res.send({
        location,
        forecast: data
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(3000, () => {
  console.log('Server is up on port http://localhost:3000')
})