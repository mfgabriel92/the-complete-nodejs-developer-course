const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const HTTP = require('../utils/httpCodes')

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.MONGODB_JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error('Unauthorized')
    }

    req.user = user
    req.token = token

    next()
  } catch (e) {
    res.status(HTTP.UNAUTHORIZED).send('Unauthorized')
  }
}