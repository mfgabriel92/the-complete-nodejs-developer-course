const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

const form = document.querySelector('#message-form')
const input = document.querySelector('input')

// button.addEventListener('click', (e) => {
//   e.preventDefault()
//   socket.emit('sendMessage', e.target.elements.message)
// })
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const message = e.target.message.value

  socket.emit('sendMessage', message)
})