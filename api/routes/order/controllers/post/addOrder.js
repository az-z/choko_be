const { Types } = require('mongoose')
module.exports = async (req, res) => {
  const { images, gallery, user, name, lastname, phone, email, summ } = req.body
  if (!images) return res.status(400).send({ msg: 'Список изображений отсутствует' })
  if (!gallery) return res.status(400).send({ msg: 'Галерея отсутствует' })
  if (!user) return res.status(400).send({ msg: 'Пользователь отсутствует' })
  if (!name) return res.status(400).send({ msg: 'Имя обязательно' })
  if (!email) return res.status(400).send({ msg: 'E-mail обязателен' })
  const currUser = await db.Users.findOne({ _id: user })
  const order = new db.Orders({
    _id: new Types.ObjectId(),
    user, images, gallery, name, lastname, phone, email, summ
  })
  currUser.orders.push(order.id)
  const orderResultat = await order.save()
  if (!orderResultat) return res.status(500).send({ msg: 'Неудалось сохранить заказ в базу данных' })
  const userResultat = await currUser.save()
  if (!userResultat) {
    console.log(userResultat)
    return res.status(500).send({ msg: 'Неудалось обновить пользователя' })
  }
  const message = {
    to: email,
    subject: 'Заказ оформлен успешно',
    text: 'Спасибо за заказ, после оплаты вам прийдет письмо с сылкой на ваши фото!'
  }
  mailer(message)
  res.send({ msg: 'Заказ создан успешно' })
}