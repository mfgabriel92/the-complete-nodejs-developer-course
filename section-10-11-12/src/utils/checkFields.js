module.exports = (body, fillableFields) => {
  const fields = Object.keys(body)
  return fields.every(field => fillableFields.includes(field))
}