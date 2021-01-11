require('dotenv').config()
const { Types }   =   require('mongoose')
const Jimp        =   require('jimp')
const ExifImage   =   require('exif').ExifImage 

module.exports = async (req, res) => {
  const images = req.files
  let savedImages = []
  if (!images) return res.status(404).send({ msg: "Изображений ненайденно" })
  if (!req.user.storage.full) {
    await images.map(async image => {
      const newImage = new db.Images({
        _id: new Types.ObjectId(),
        name: image.filename,
        originalName: image.originalname,
        path: {
          original: `${process.env.FULL_PATH}/${image.filename}`
        },
        size: image.size,
        uploader: req.user._id
      })
      req.user.storage.usage = req.user.storage.usage + image.size
      if (req.user.storage.usage >= req.user.storage.limit) req.user.storage.full = true
      else req.user.storage.full = false
      savedImages.push(newImage._id)
      const exifImageData = new ExifImage({ image: `uploads/${image.filename}` }, async function (error, exifData) {
        // console.log(exifData)
        if (error) return console.error('Error: ', error)
        await Jimp.read(`uploads/${image.filename}`).then(async img => {
          newImage.path.small = `${process.env.FULL_PATH}/small_${image.filename}`
          const watermark = await Jimp.read('static/watermark.png')
          return img
            .scale(.3) // resize
            .quality(100) // set JPEG quality
            .rotate( exifData.image.Orientation == 8 ? 270 : 0 )
            .rotate( exifData.image.Orientation == 6 ? 90 : 0 )
            .rotate( exifData.image.Orientation == 3 ? 180 : 0 )
            .composite(watermark, 0, 0, [{
              mode: Jimp.BLEND_SCREEN,
              opacitySource: 1,
              opacityDest: 1
            }])
            .write(`uploads/small_${image.filename}`); // save
        }).catch(err => {
          console.error(err)
        })
        await newImage.save()
      })
      try {
        req.user.images = req.user.images.concat(savedImages)
        const saveUserResultat = await req.user.save()
        res.send({ msg: 'Фото загружены успешно', images: savedImages })
      } catch (error) {
        console.error(error)
        res.status(500).send({ msg: 'Ошибка сервера' })
      }
    })
  } else {
    res.status(205).json({ msg: 'Лимит привышен' })
  }
}