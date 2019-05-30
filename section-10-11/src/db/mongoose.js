const { connect, model } = require('mongoose')
const validator = require('validator')

connect('mongodb://127.0.0.1:27017/task-manager', { useNewUrlParser: true, useCreateIndex: true })

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
  createdAt: { type: Date, default: Date.now()},
  updatedAt: { type: Date, default: Date.now()},
})

const me = new User({
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  age: 30
})

me.save().then(model => {
  console.log('Success')
}).catch(e => {
  console.log('Error:', e)
})