const { MongoClient, ObjectID } = require('mongodb')

const _id = new ObjectID()

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }

  const database = client.db('task-manager')

  database.collection('users').findOne({ _id: new ObjectID('5cef23d9f0a09f0d060ab74d') }, (error, document) => {
    if (error) {
      return console.log(error)
    }

    console.log(document)
  })

  database.collection('users').find({ age: 26 }).toArray((error, documents) => {
    if (error) {
      return console.log(error)
    }

    console.log(documents)
  })
})