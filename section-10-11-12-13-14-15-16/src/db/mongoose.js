const { connect } = require('mongoose')

connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useCreateIndex: true })