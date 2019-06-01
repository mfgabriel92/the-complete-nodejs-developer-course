const { model, Schema } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Task } = require('./task')

const fillableFields = ['name', 'email', 'age', 'password']

const userSchema = new Schema({
  name: { type: String, trim: true },
  email: {
    type: String,
    unique: true,
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
  tokens: [{
    token: { type: String, requires: true }
  }],
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  next()
})

userSchema.pre('delete', async function (next) {
  await Task.deleteMany({ user: this._id })
  next()
})

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'user'
})

userSchema.methods.toJSON = function () {
  const obj = this.toObject()

  delete obj.password
  delete obj.tokens

  return obj
}

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, '10qpalzmxnsjwi29')

  this.tokens = this.tokens.concat({ token })
  await this.save()

  return token
}

userSchema.statics.findByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Wrong credentials')
  }

  return user
}

const User = model('User', userSchema)

module.exports = { User, fillableFields }