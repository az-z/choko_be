module.exports = async (req, res) =>  {
  const { title, description, folder, price, activity, images } = req.body
  const folderId = folder ? folder.split('/').pop() : ''
  const gallery = await db.Galleries.findOne({ _id: req.params.id })
  if (!gallery) return res.status(404).send({ msg: 'Галере не найдена' })
  gallery.title = title
  gallery.description = description
  gallery.folder = folderId
  gallery.price = price
  gallery.activity = activity
  gallery.images = images
  gallery.save().then(resultat => {
    res.send({ msg: 'Галерея успешно изменена', gallery: resultat })
  }).catch(error => {
    res.status(500).send({ msg: 'Неудалось изменить галерею', error })
  })
}