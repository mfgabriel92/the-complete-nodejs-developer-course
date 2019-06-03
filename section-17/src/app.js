const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

let count = 0

io.on('connection', (socket) => {
  socket.on('increment', () => {
    count++
    io.emit('newCount', count)
  })
})

module.exports = server