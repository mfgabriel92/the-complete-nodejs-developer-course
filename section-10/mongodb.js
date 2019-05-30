const Mongo = require('mongodb').MongoClient

Mongo.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }

  const database = client.db('task-manager')

  database.collection('tasks').insertMany([
    {
      description: 'Lorem ipsum dolor',
      completed: true
    },
    {
      description: 'Lorem ipsum dolor',
      completed: true
    },
    {
      description: 'Lorem ipsum dolor',
      completed: false
    }
  ], (error, result) => {
    if (error) {
      return console.log(error)
    }

    console.log(result.ops)
  })
})