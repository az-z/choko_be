const multer = require('multer')

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        return cb(null, false);
    }
    cb(null, true);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `u${req.user._id}_d${new Date().valueOf()}.${file.mimetype.split('/')[1]}`)
    }
})

module.exports = multer({
    storage: storage,
    limits: {
        files: 200,
        fileSize: 1920 * 1080 * 2
    },
    fileFilter: fileFilter
})