require('dotenv').config()
const { Types } = require('mongoose')
const Jimp = require('jimp')
// const Exif = require('exif').ExifImage

// module.exports = (req, res) => {
//   if (req.fileValidationError) return res.status(201).send({ error: req.fileValidationError })
//   if (req.fileExistError) return res.status(201).send({ error: req.fileExistError })
//   if (req.sorageLimitError) return res.status(500).send({ msg: "Недостаточно места на диске" })
//   const images = req.files
//   const { gallery } = req.body
//   if (!images) return res.status(404).send({ msg: "Изображений ненайденно" })
//   const pathToOriginalFile = `uploads/${req.user._id}/${gallery}/${images[0].filename}`
//   const savePath = `uploads/${req.user._id}/${gallery}`
//   const newImage = new db.Images({
//     _id: new Types.ObjectId(),
//     name: images[0].filename,
//     originalName: images[0].originalname,
//     path: {
//       original: `${process.env.FULL_PATH}/${req.user._id}/${gallery}/${images[0].filename}`,
//       small: `${process.env.FULL_PATH}/${req.user._id}/${gallery}/small_${images[0].filename}`,
//       xs: `${process.env.FULL_PATH}/${req.user._id}/${gallery}/xs_${images[0].filename}`
//     },
//     size: images[0].size,
//     uploader: req.user._id,
//     gallery
//   })
//   req.user.storage.usage += images[0].size
//   if (req.user.storage.usage >= req.user.storage.limit) req.user.storage.full = true
//   else req.user.storage.full = false
//   req.user.images.push(newImage._id)
//   Exif({ image: pathToOriginalFile }, (error, exifData) => {
//     if (error) {
//       console.log('EXIF ERROR:', error)
//       return res.status(500).send({ msg: "Ошибка сервера. EXIF ERROR" })
//     }
//     Jimp.read(pathToOriginalFile, (error3, watermark) => {
//       if (error3) {
//         console.log('JIMP_3_WATERMARK ERROR:', error3)
//         return res.status(500).send({ msg: "Ошибка сервера. JIMP_1_WATERMARK ERROR" })
//       }
//       Jimp.read(pathToOriginalFile, (error2, image1) => {
//         if (error2) {
//           console.log('JIMP_1 ERROR:', error2)
//           return res.status(500).send({ msg: "Ошибка сервера. JIMP_1 ERROR" })
//         }
//         image1
//           .scale(.3)
//           .quality(90)
//           .rotate(exifData && exifData.image.Orientation == 8 ? 270 : 0)
//           .rotate(exifData && exifData.image.Orientation == 6 ? 90 : 0)
//           .rotate(exifData && exifData.image.Orientation == 3 ? 180 : 0)
//           .composite(watermark, 0, 0, [{
//             mode: Jimp.BLEND_SCREEN,
//             opacitySource: 1,
//             opacityDest: 1
//           }])
//           .write(`uploads/${req.user._id}/${gallery}/small_${images[0].filename}`)
//         Jimp.read(pathToOriginalFile, (error4, image2) => {
//           if (error4) {
//             console.log('JIMP_1_XS ERROR:', error4)
//             return res.status(500).send({ msg: "Ошибка сервера. JIMP_1_XS ERROR" })
//           }
//           image2
//             .scale(.3)
//             .quality(90)
//             .rotate(exifData && exifData.image.Orientation == 8 ? 270 : 0)
//             .rotate(exifData && exifData.image.Orientation == 6 ? 90 : 0)
//             .rotate(exifData && exifData.image.Orientation == 3 ? 180 : 0)
//             .write(`uploads/${req.user._id}/${gallery}/xs_${images[0].filename}`)
//           newImage.save().then(resultat1 => {
//             req.user.save().then(resultat2 => {
//               res.status(200).json({ msg: 'Фото загружены успешно', images: [newImage._id] })
//             }).catch(error6 => {
//               console.log('USER_BD_SVA ERROR:', error6)
//               return res.status(500).send({ msg: "Ошибка сервера USER_DB_SAVE ERROR" })
//             })
//           }).catch(error5 => {
//             console.log('IMAGE_BD_SVA ERROR:', error5)
//             return res.status(500).send({ msg: "Ошибка сервера IMAGE_DB_SAVE ERROR" })
//           })
//         })
//       })
//     })
//   })
// }




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
    // const resultatResizeXS = await resize({ ...payload, type: 'xs', scale: .1, watermark: null, qualit: 50 })
    // console.log('resultatResizeXS', true);
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