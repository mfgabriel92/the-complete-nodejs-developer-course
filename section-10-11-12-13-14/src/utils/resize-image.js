const sharp = require('sharp')

module.exports = async (file) => {
  return await sharp(file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
}