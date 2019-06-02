require('./db/mongoose')

const express = require('express')
const user = require('./routers/user')
const task = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(user)
app.use(task)

app.listen(port, () => console.log(`Server runing on port ${port}`))