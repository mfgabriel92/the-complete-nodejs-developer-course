const express = require('express')
const auth = require('../middleware/auth')
const { Task, fillableFields } = require('../models/task')
const HTTP = require('../utils/httpCodes')
const isValid = require('../utils/checkFields')
const router = new express.Router()

router.get('/api/tasks', auth, async ({ user }, res) => {
  try {
    const { tasks } = await user.populate('tasks').execPopulate()

    res.send(tasks)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.get('/api/tasks/:id', auth, async (req, res) => {
  const { params, user } = req

  try {
    const task = await Task.findOne({ _id: params.id, user: user._id })

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    res.send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.post('/api/tasks', auth, async (req, res) => {
  const { body, user } = req
  
  if (!isValid(body, fillableFields)) {
    return res.status(HTTP.BAD_REQUEST).send('Invalid fields')
  }

  const task = new Task({
    ...body,
    user: user._id
  })

  try {
    await task.save()
    res.status(HTTP.CREATED).send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.patch('/api/tasks/:id', auth, async (req, res) => {
  const { params, body, user } = req

  if (!isValid(body, fillableFields)) {
    return res.status(HTTP.BAD_REQUEST).send('Invalid fields')
  }

  try {
    const task = await Task.findOne({ _id: params.id, user: user._id })

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    Object.keys(body).forEach(field => task[field] = body[field])
    await task.save()

    res.send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.delete('/api/tasks/:id', auth, async (req, res) => {
  const { params, user } = req

  try {
    const task = await Task.findOneAndDelete({ _id: params.id, user: user._id })

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

module.exports = router