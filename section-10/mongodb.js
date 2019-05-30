const { MongoClient, ObjectID } = require('mongodb')

const _id = new ObjectID()

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }

  const database = client.db('task-manager')

  database.collection('users').deleteMany({
    age: 7
  }).then(r => {
    console.log('Success!')
  }).catch(e => {
    console.log('Error!')
  })

  database.collection('tasks').deleteOne({
    _id: new ObjectID('5cef243b1d64ca0dc844422d')
  }).then(r => {
    console.log('Success!')
  }).catch(e => {
    console.log('Error!')
  })
})