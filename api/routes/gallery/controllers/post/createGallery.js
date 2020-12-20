const { Types } = require('mongoose')
module.exports = async ( req, res ) => {
  const { title, description, folder, price, activity, images, payment } = req.body
  const gallery = await new db.Galleries({
    _id: Types.ObjectId(),
    title,
    creator: req.user._id,
    description,
    price,
    activity,
    images,
    payment
  })
  console.log(gallery)
  req.user.galleries.push(gallery._id)
  req.user.save()
  gallery.save().then(response => {
    res.send({ msg: 'Галерея создана успешно', gallery: response })
  }).catch(error => {
    res.status(500).send({ msg: 'Ошибка при сохранении галереи', error })
  })
}