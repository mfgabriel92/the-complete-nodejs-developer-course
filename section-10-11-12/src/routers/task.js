const express = require('express')
const { Task, fillableFields } = require('../models/task')
const HTTP = require('../utils/httpCodes')
const { isValid } = require('../utils/checkFields')
const router = new express.Router()

router.get('/api/tasks', async ({ body }, res) => {
  try {
    res.send(await Task.find({}))
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.get('/api/tasks/:id', async ({ params }, res) => {
  try {
    const task = await Task.findById(params.id)

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    res.send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.post('/api/tasks', async ({ body }, res) => {
  if (!isValid(body, fillableFields)) {
    return res.status(HTTP.BAD_REQUEST).send('Invalid fields')
  }

  try {
    const task = await new Task(body).save()
    res.status(HTTP.CREATED).send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.patch('/api/tasks/:id', async ({ params, body }, res) => {
  try {
    const task = await Task.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    res.send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.delete('/api/tasks/:id', async ({ params }, res) => {
  try {
    const task = await Task.findByIdAndRemove(params.id)

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    res.send('Task deleted')
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

module.exports = router