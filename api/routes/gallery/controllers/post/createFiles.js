require('dotenv').config()
const { Types }   =   require('mongoose')
const Jimp        =   require('jimp')
const exif        =   require('exif-async')

const resize = async function (payload) {
  const { path, watermark, exif, scale, type, savePath, filename, quality } = payload
  try {
    const image = await Jimp.read(path)
    image.scale(scale) // Resize
    image.quality(quality) // Set JPEG quality
    // Rotate Image if have exif
    if(exif && exif.image && exif.image.Orientation) {
      image.rotate(exif.image.Orientation == 8 ? 270 : 0 )
      image.rotate(exif.image.Orientation == 6 ? 90 : 0 )
      image.rotate(exif.image.Orientation == 3 ? 180 : 0 )
    }
    // Add watermark
    if (watermark) image.composite(watermark, 0, 0, [{
      mode: Jimp.BLEND_SCREEN,
      opacitySource: 1,
      opacityDest: 1
    }])
    image.write(`${savePath}/${type}_${filename}`)
    return image
  } catch (error) {
    console.error(error)
  }
}


module.exports = async (req, res) => {
  if (req.fileValidationError) return res.status(201).send({ error: req.fileValidationError })
  if (req.fileExistError) return res.status(201).send({ error: req.fileExistError })
  const images = req.files
  const { gallery } = req.body
  if (!images) return res.status(404).send({ msg: "Изображений ненайденно" })
  if (req.sorageLimitError) return res.status(500).send({ msg: "Недостаточно места на диске" })
  try {
    let savedImages = []
    const pathToOriginalFile = `uploads/${req.user._id}/${gallery}/${images[0].filename}`
    const savePath = `uploads/${req.user._id}/${gallery}`
    const newImage = new db.Images({
      _id: new Types.ObjectId(),
      name: images[0].filename,
      originalName: images[0].originalname,
      path: {
        original: `${process.env.FULL_PATH}/${req.user._id}/${gallery}/${images[0].filename}`,
        small: `${process.env.FULL_PATH}/${req.user._id}/${gallery}/small_${images[0].filename}`,
        xs: `${process.env.FULL_PATH}/${req.user._id}/${gallery}/xs_${images[0].filename}`
      },
      size: images[0].size,
      uploader: req.user._id,
      gallery
    })
    req.user.storage.usage += images[0].size
    if (req.user.storage.usage >= req.user.storage.limit) req.user.storage.full = true
    else req.user.storage.full = false
    savedImages.push(newImage._id)
    const exifData = await exif(pathToOriginalFile).catch(error => console.error(error))
    const watermark = await Jimp.read('static/watermark.png')
    const payload = {
      path: pathToOriginalFile,
      watermark,
      exif: exifData,
      scale: .3,
      type: 'small',
      savePath,
      quality: 80,
      filename: images[0].filename
    }
    const resultatResizeWatermark = await resize(payload)
    console.log('resultatResizeWatermark', true);
    const resultatResizeXS = await resize({ ...payload, type: 'xs', scale: .1, watermark: null, qualit: 50 })
    console.log('resultatResizeXS', true);
    const saveImage = await newImage.save()
    console.log('saveImage', true);
    req.user.images = req.user.images.concat(savedImages)
    console.log('saveImage', true);
    const saveUserResultat = await req.user.save()
    console.log('saveUserResultat', true);
    res.status(200).json({ msg: 'Фото загружены успешно', images: savedImages })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Ошибка сервера", error })
  }
}