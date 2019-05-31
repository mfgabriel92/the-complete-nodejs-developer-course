const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const HTTP = require('../utils/httpCodes')

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, '10qpalzmxnsjwi29')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error('Unauthorized')
    }

    req.user = user

    next()
  } catch (e) {
    res.status(HTTP.UNAUTHORIZED).send('Unauthorized')
  }
}