const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const HTTP = require('../utils/httpCodes')
const router = new express.Router()

router.get('/api/tasks', auth, async ({ user, query }, res) => {
  let match = {}
  let sortBy

  if (query.completed) match.completed = query.completed === 'true'
  if (query.sort) sortBy = query.sort.split(':')

  try {
    const { tasks } = await user.populate({
      path: 'tasks', 
      match,
      options: {
        limit: parseInt(query.limit) || 10,
        skip: parseInt(query.skip) || 0,
        sort: { [sortBy[0]]: sortBy[1] }
      } 
    }).execPopulate()

    res.send(tasks)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.get('/api/tasks/:id', auth, async ({ params, user }, res) => {
  try {
    const task = await Task.findOne({ _id: params.id, user: user._id })

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    res.send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.post('/api/tasks', auth, async ({ body, user }, res) => {
  const task = new Task({
    ...body,
    user: user._id
  })

  try {
    await task.save()
    res.status(HTTP.CREATED).send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.patch('/api/tasks/:id', auth, async (req, res) => {
  const { params, body, user } = req

  try {
    const task = await Task.findOne({ _id: params.id, user: user._id })

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    Object.keys(body).forEach(field => task[field] = body[field])
    await task.save()

    res.send(task)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.delete('/api/tasks/:id', auth, async ({ params, user }, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: params.id, user: user._id })

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send('Task not found')
    }

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

module.exports = router