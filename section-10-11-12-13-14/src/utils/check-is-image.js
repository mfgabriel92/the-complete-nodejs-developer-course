module.exports = function (res, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/gm)) {
    return cb(new Error('File type must be JPG, JPEG, or PNG'))
  }

  cb(undefined, true)
} 