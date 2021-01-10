const multer = require('multer')

const fileFilter = async (req, file, cb) => {
  const regex = /\.(jpg|JPG|jpeg|JPEG)$/
  if (!file.originalname.match(regex)) return cb(null, false)
  // const image = await db.Images.findOne({ originalName: file.originalname, uploader: req.user._id })
  // if (image) return cb(null, false)
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) =>
    cb(null, `u${req.user._id}_d${new Date().valueOf()}.${file.mimetype.split('/')[1]}`)
})

const limits = {
  files: 200000,
  fileSize: 1920 * 1080 * 80
}

module.exports = multer({
  storage,
  limits,
  fileFilter
})
