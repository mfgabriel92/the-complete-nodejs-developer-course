const form = document.querySelector('form')
const input = document.querySelector('input')
const result = document.querySelector('p')

function populateResults(msg) {
  result.innerHTML = JSON.stringify(msg, null, 4)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  
  fetch(`/weather?address=${input.value}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        return populateResults(data.error)
      }

      return populateResults(data)
    })
  })
})