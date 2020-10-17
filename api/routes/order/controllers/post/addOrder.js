module.exports = async (req, res) => {
  const { images, gallery } = req.body
  if (!images) return res.status(400).send({ msg: 'Список изображений отсутствует' })
  if (!gallery) return res.status(400).send({ msg: 'Галерея отсутствует' })
  const order = new db.Orders({
    user: req.user._id,
    images, gallery
  })
  order.save().then(result => {
    res.send({ msg: 'Заказ создан успешно' })
  }).catch(error => {
    res.status(500).send({ error, msg: 'Неудалось сохранить заказ в базу данных' })
  })
}