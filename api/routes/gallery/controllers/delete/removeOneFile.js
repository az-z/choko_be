const { unlink } = require('fs')
module.exports = async (req, res) => {
  const { id, gallery } = req.params
  let currGallery = null
  if(gallery !== 'create') currGallery = await db.Galleries.findOne({ _id: gallery, creator: req.user._id })
  if(!currGallery && gallery !== 'create') return res.status(404).send({ msg: 'Галерея не найдена' })
  const file = await db.Images.findOne({ _id: id, uploader: req.user._id })
  if(!file) return res.status(404).send({ msg: 'Файл не найден' })
  unlink(`uploads/${file.name}`, error => console.error(error))
  unlink(`uploads/small_${file.name}`, error => console.error(error))
  if (currGallery) currGallery.images = currGallery.images.filter(image => image !== id)
  if (currGallery) return currGallery.save().then(result => {
    file.remove().then(result => {
      res.send({ msg: 'Файл удален, галерея очищена' })
    }).catch(error => {
      res.status(500).send({ msg: 'Неудалось удалить файл из бд, галерея очищена' })
    })
  }).catch(err => {
    res.status(500).send({ msg: 'Неудалось сохранить галерею', error: err })
  })
  res.send({ msg: 'Файл удален' })
}