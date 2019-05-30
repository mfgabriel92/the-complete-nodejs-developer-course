require('./db/mongoose')

const express = require('express')
const User = require('./models/user')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/api/users', (req, res) => {
  new User(req.body).save()
  .then(r => res.send(r))
  .catch(e => {
    res.send(400, {
      code: 400,
      error: e.message
    })
  })
})

app.listen(port, () => console.log(`Server runing on port ${port}`))