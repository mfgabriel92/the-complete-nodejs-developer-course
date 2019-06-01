const { model, Schema } = require('mongoose')

const fillableFields = ['description', 'completed', 'priority']

const Task = model('Task', {
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { 
    type: Number, 
    default: 3,
    min: [1, 'The minimum priority level is 1'],
    max: [3, 'The maximum priority level is 3'] 
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now()},
  updatedAt: { type: Date, default: Date.now()},
})

module.exports = { Task, fillableFields }