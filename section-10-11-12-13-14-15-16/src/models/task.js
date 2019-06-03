const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
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
}, {
  timestamps: true
})

const Task = model('Task', taskSchema)

module.exports = Task