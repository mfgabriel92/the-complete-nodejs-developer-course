const { MongoClient, ObjectID } = require('mongodb')

const _id = new ObjectID()

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }

  const database = client.db('task-manager')

  database.collection('users').updateOne({ 
    _id: new ObjectID('5cef21f9e30f4b095fb929df')
  }, {
    $set: {
      name: 'Michael',
    },
    $inc: {
      age: 1
    }
  }).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })

  database.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })
})