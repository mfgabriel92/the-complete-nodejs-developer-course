const mongodb = require('mongodb')
const Mongo = mongodb.MongoClient

Mongo.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }

  const database = client.db('task-manager')

  database.collection('users').insertOne({
    name: 'Gabriel',
    age: 26
  })
})