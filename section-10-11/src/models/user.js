const { model } = require('mongoose')
const validator = require('validator')

const User = model('User', {
  name: { type: String, trim: true },
  email: { 
    type: String, 
    require: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error('The e-mail provided is invalid')
    }
  },
  age: { 
    type: Number, 
    min: [0, 'Age must be positive'], 
    default: 0 
  },
  password: {
    type: String,
    require: true,
    minlength: [8, 'Password must contain more than 8 characters']
  },
  createdAt: { type: Date, default: Date.now()},
  updatedAt: { type: Date, default: Date.now()},
})

module.exports = User