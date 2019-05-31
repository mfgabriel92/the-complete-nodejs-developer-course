const express = require('express')
const auth = require('../middleware/auth')
const { User, fillableFields } = require('../models/user')
const HTTP = require('../utils/httpCodes')
const isValid = require('../utils/checkFields')
const router = new express.Router()

router.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findByEmailAndPassword(email, password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.post('/api/users/logout', auth, async (req, res) => {
  const { user, token } = req

  try {
    user.tokens = user.tokens.filter((t) => t.token !== token)
    await user.save()

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.post('/api/users/logoutAll', auth, async (req, res) => {
  const { user, token } = req

  try {
    user.tokens = []
    await user.save()

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.get('/api/users/me', auth, async ({ user }, res) => {
  res.send(user)
})

router.post('/api/users', async ({ body }, res) => {
  if (!isValid(body, fillableFields)) {
    return res.status(HTTP.BAD_REQUEST).send('Invalid fields')
  }

  try {
    const user = await new User(body).save()
    const token = await user.generateAuthToken()

    res.status(HTTP.CREATED).send({ user, token })
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.patch('/api/users/:id', auth, async (req, res) => {
  const { params, body } = req

  try {
    const user = await User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })

    if (!user) {
      return res.status(HTTP.NOT_FOUND).send('User not found')
    }

    res.send(user)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

module.exports = router