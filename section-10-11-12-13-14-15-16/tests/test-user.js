const { Types: { ObjectId } } = require('mongoose')
const jwt = require('jsonwebtoken')
const _id = new ObjectId()

module.exports = {
  _id,
  name: "John Doe",
  email: "johndoe@email.com",
  password: "johndoepassword!!!",
  tokens: [{
    token: jwt.sign({ _id }, process.env.MONGODB_JWT_SECRET)
  }]
}