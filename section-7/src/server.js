const express = require('express')
const app = express()

app.get('', (req, res) => {
  res.send('<h1>Hello, ExpressJS!</h1>')
})

app.get('/help', (req, res) => {
  res.send('Help!')
})

app.get('/about', (req, res) => {
  res.send({
    name: 'Foo'
  })
})

app.get('/weather', (req, res) => {
  res.send('The weather')
})

app.listen(3000, () => {
  console.log('Server is up on port http://localhost:3000')
})