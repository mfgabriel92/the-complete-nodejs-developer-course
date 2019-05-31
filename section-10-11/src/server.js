require('./db/mongoose')

const express = require('express')
const HTTP = require('./utils/httpCodes')
const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/api/users', ({ body }, res) => {
  new User(body)
  .save()
  .then(r => res.status(HTTP.CREATED).send(r))
  .catch(e => res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  )
})

app.post('/api/tasks', ({ body }, res) => {
  new Task(body)
  .save()
  .then(r => res.status(HTTP.CREATED).send(r))
  .catch(e => res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  )
})

app.get('/api/tasks', ({ body }, res) => {
  Task.find({})
  .then(r => res.send(r))
  .catch(e => res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  )
})

app.get('/api/tasks/:id', ({ params }, res) => {
  Task.findById(params.id)
  .then(r => {
    if (!r) {
      return res.status(HTTP.NOT_FOUND).send({
        code: HTTP.NOT_FOUND,
        error: 'Task not found'
      })
    }

    res.send(r)
  })
  .catch(e => res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  )
})

app.listen(port, () => console.log(`Server runing on port ${port}`))