const express = require('express')
const multer = require('multer')
const auth = require('../middleware/auth')
const { User, fillableFields } = require('../models/user')
const HTTP = require('../utils/httpCodes')
const isValid = require('../utils/checkFields')
const checkIsImage = require('../utils/check-is-image')
const router = new express.Router()
const upload = multer({
  dest: 'profile-pictures',
  limits: { fileSize: 1000000 },
  fileFilter(r, f, c) { checkIsImage(r, f, c) }
}).single('file')

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

router.patch('/api/users/me', auth, async (req, res) => {
  const { body, user } = req

  if (!isValid(body, fillableFields)) {
    return res.status(HTTP.BAD_REQUEST).send('Invalid fields')
  }

  try {
    Object.keys(body).forEach(update => user[update] = body[update])
    await user.save()

    res.send(user)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.delete('/api/users/me', auth, async ({ user }, res) => {
  try {
    await user.delete()
    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.message)
  }
})

router.post('/api/users/me/picture', upload, async ({ user }, res) => {
  res.send()
  // try {
  // } catch (e) {
  // }
}, (error, req, res, next) => res.status(HTTP.BAD_REQUEST).send({ error: error }))

module.exports = router