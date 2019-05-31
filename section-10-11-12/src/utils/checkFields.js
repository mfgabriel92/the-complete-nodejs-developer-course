const isValid = (body, fillableFields) => {
  console.log(Object.keys(body))
  console.log(fillableFields)
  const fields = Object.keys(body)
  return fields.every(field => fillableFields.includes(field))
}

module.exports = {
  isValid
}