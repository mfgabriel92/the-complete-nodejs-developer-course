const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const { User, fillableFields } = require('../models/user')
const HTTP = require('../utils/httpCodes')
const isValid = require('../utils/checkFields')
const checkIsImage = require('../utils/check-is-image')
const resizeImage = require('../utils/resize-image')
const router = new express.Router()
const upload = multer({
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
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.post('/api/users/logout', auth, async (req, res) => {
  const { user, token } = req

  try {
    user.tokens = user.tokens.filter((t) => t.token !== token)
    await user.save()

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.post('/api/users/logoutAll', auth, async (req, res) => {
  const { user, token } = req

  try {
    user.tokens = []
    await user.save()

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.get('/api/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.post('/api/users', async (req, res) => {
  if (!isValid(req.body, fillableFields)) {
    return res.status(HTTP.BAD_REQUEST).send('Invalid fields')
  }

  try {
    const user = await new User(req.body).save()
    const token = await user.generateAuthToken()

    res.status(HTTP.CREATED).send({ user, token })
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
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
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.delete('/api/users/me', auth, async (req, res) => {
  try {
    await req.user.delete()
    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.post('/api/users/me/picture', auth, upload, async (req, res) => {
  const { file, user } = req

  try {
    user.picture = await resizeImage(file)
    await user.save()

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
}, (error, req, res, next) => res.status(HTTP.BAD_REQUEST).send({ error: error.message }))

router.delete('/api/users/me/picture', auth, async (req, res) => {
  const { user } = req
  try {
    user.picture = null
    await user.save()

    res.send()
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

router.get('/api/users/:id/picture', async (req, res) => {
  const { params } = req

  try {
    const user = await User.findById(params.id)

    if (!user || !user.picture) {
      return res.status(HTTP.NOT_FOUND).send({ error: 'User not found' })
    }

    res.set('Content-Type', 'image/png')
    res.send(user.picture)
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send({ error: e.message })
  }
})

module.exports = router