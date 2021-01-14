const fs = require('fs')
const multer = require('multer')

const fileFilter = async (req, file, cb) => {
  const regex = /\.(jpg|JPG|jpeg|JPEG)$/
  const { gallery } = req.body
  console.log(req.body);
  if (!file.originalname.match(regex)) return cb(null, false)
  try {
    const image = await db.Images.findOne({ originalName: file.originalname, uploader: req.user._id, gallery })
    console.log(image);
    if (image) {
      req.fileValidationError = 'goes wrong on the mimetype'
      return cb(null, false)
    }
    cb(null, true)
    console.log('true');
  } catch (error) {
    cb(null, false)
  }
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { gallery } = req.body
    const folder1 = `./uploads/${req.user._id}/`
    const folder2 = `./uploads/${req.user._id}/${gallery}/`
    if (!fs.existsSync(folder1)) await fs.mkdirSync(folder1)
    if (!fs.existsSync(folder2)) await fs.mkdirSync(folder2)
    cb(null, folder2)
  },
  filename: (req, file, cb) =>
    cb(null, file.originalname)
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
