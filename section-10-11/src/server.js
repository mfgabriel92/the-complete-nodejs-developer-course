require('./db/mongoose')

const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000
const HTTP = require('./utils/httpCodes')

app.use(express.json())

app.post('/api/users', ({ body }, res) => {
  new User(body)
  .save()
  .then(r => res.staus(HTTP.CREATED).send(r))
  .catch(e => res.staus(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  )
})

app.post('/api/tasks', ({ body }, res) => {
  new Task(body)
  .save()
  .then(r => res.staus(HTTP.CREATED).send(r))
  .catch(e => res.staus(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  )
})

app.listen(port, () => console.log(`Server runing on port ${port}`))