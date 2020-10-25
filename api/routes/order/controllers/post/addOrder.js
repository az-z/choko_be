const { Types } = require('mongoose')
module.exports = async (req, res) => {
  const { images, gallery, user } = req.body
  if (!images) return res.status(400).send({ msg: 'Список изображений отсутствует' })
  if (!gallery) return res.status(400).send({ msg: 'Галерея отсутствует' })
  if (!user) return res.status(400).send({ msg: 'Пользователь отсутствует' })
  const currUser = await db.Users.findOne({ _id: user })
  const order = new db.Orders({
    _id: new Types.ObjectId(),
    user: user,
    images, gallery
  })
  currUser.orders.push(order.id)
  order.save().then(result => {
    res.send({ msg: 'Заказ создан успешно' })
  }).catch(error => {
    res.status(500).send({ error, msg: 'Неудалось сохранить заказ в базу данных' })
  })
}