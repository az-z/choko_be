const {Types} = require('mongoose')
const Jimp = require('jimp')
require('dotenv').config()
module.exports = async (req, res) => {
  const images = req.files
  if (!images) return res.status(404).send({msg: "Изображений ненайденно"})
  let savedImages = []
  await images.map( async image => {
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
    savedImages.push(newImage._id)
    await Jimp.read(`uploads/${image.filename}`).then( async img => {
        newImage.path.small = `${process.env.FULL_PATH}/small_${image.filename}`
        const watermark = await Jimp.read('static/watermark.png')
        return img
          .resize(768, 512) // resize
          .quality(100) // set JPEG quality
          .composite(watermark, 0, 0, [{
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 1,
            opacityDest: 1
          }])
          // .greyscale() // set greyscale
          .write(`uploads/small_${image.filename}`); // save
      }).catch(err => {
        console.error(err);
      });
    await newImage.save()
  })
  try {
    // const arrayImages = savedImages.map(element => {
    //   return element._id
    // })
    req.user.images = req.user.images.concat(savedImages)
    const saveUserResultat = await req.user.save()
    res.send({ msg: 'Фото загружены успешно', images: savedImages })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Ошибка сервера' })
  }
}