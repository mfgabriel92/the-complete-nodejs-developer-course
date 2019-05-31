require('./db/mongoose')

const express = require('express')
const HTTP = require('./utils/httpCodes')
const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/api/users', async ({ body }, res) => {
  try {
    const user = await new User(body).save()
    res.status(HTTP.CREATED).send(user)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  }
})

app.post('/api/tasks', async ({ body }, res) => {
  try {
    const task = await new Task(body).save()
    res.status(HTTP.CREATED).send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  }
})

app.get('/api/tasks', async ({ body }, res) => {

  try {
    res.send(await Task.find({}))
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  }
})

app.get('/api/tasks/:id', async ({ params }, res) => {
  try {
    const task = await Task.findById(params.id)

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send({
        code: HTTP.NOT_FOUND,
        error: 'Task not found'
      })
    }

    res.send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({
      code: HTTP.BAD_REQUEST,
      error: e.message
    })
  }
})

app.listen(port, () => console.log(`Server runing on port ${port}`))