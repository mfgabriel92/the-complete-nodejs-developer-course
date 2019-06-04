const socket = io()

const $messagesForm = document.querySelector('#messages-form')
const $messagesInput = document.querySelector('#messages-input')
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML

$messagesForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const $input = e.target.message.value

  socket.emit('sendMessage', $input)

  $messagesInput.value = ''
})

socket.on('message', (message) => {
  const html = Mustache.render(messageTemplate, { message })
  $messages.insertAdjacentHTML('beforeend', html)
})