const isValid = (body, fillableFields) => {
  const fields = Object.keys(body)
  return fields.every(field => fillableFields.includes(field))
}

module.exports = {
  isValid
}