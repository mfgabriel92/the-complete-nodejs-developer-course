const express = require('express')
const path = require('path')
const app = express()
const publicDir = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Index title rendered dynamically',
    name: 'Gabriel'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About title rendered dynamically',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port http://localhost:3000')
})