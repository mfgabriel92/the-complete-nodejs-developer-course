const express = require('express')
const { User, fillableFields } = require('../models/user')
const HTTP = require('../utils/httpCodes')
const { isValid } = require('../utils/checkFields')
const router = new express.Router()

router.post('/api/users/login', async ({ body }, res) => {
  try {
    const { email, password } = body
    const user = await User.findByEmailAndPassword(email, password)
    
    res.send(user)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.post('/api/users', async ({ body }, res) => {
  if (!isValid(body, fillableFields)) {
    return res.status(HTTP.BAD_REQUEST).send('Invalid fields')
  }

  try {
    const user = await new User(body).save()
    res.status(HTTP.CREATED).send(user)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.patch('/api/users/:id', async ({ params, body }, res) => {
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