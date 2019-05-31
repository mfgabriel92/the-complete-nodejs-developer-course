const HTTP = require('../utils/httpCodes')

const checkAuth = (req, res, next) => {
  res.status(HTTP.SERVICE_UNAVAILABLE).send('Under maintenance')
}

module.exports = checkAuth