const { Types } = require('mongoose')
module.exports = async (req, res) => {
  const { images, gallery, user, name, lastname, phone, email, summ } = req.body
  if (!images) return res.status(400).send({ msg: 'Список изображений отсутствует' })
  if (!gallery) return res.status(400).send({ msg: 'Галерея отсутствует' })
  if (!user) return res.status(400).send({ msg: 'Пользователь отсутствует' })
  // if (!name) return res.status(400).send({ msg: 'Имя обязательно' })
  if (!email) return res.status(400).send({ msg: 'E-mail обязателен' })

  const currGallery = await db.Galleries.findOne({ _id: gallery })
  const currUser = await db.Users.findOne({ _id: user })
  const order = new db.Orders({
    _id: new Types.ObjectId(),
    user, images, gallery, name, lastname, phone, email, summ
  })
  currUser.orders.push(order.id)
  const orderResult = await order.save()
  if (!orderResult) return res.status(500).send({ msg: 'Неудалось сохранить заказ в базу данных' })

  const userResult = await currUser.save()
  if (!userResult) {
    console.log(userResult)
    return res.status(500).send({ msg: 'Неудалось обновить пользователя' })
  }

  // currUser.payment.cashText - Текст заполненый пользователем для оплаты наличными
  // currGallery - есть вся инфа с модели /db/models/Galleries.js
  // currGallery.payment - имеет типы cash(наличными) и liqpay(оплата картой)
  // if (currGallery.payment === 'cash') return;
  // const typeValue = currGallery.payment === 'cash' ? currUser.payment.cashText : ''

  const payload = {
    "To": [
      {
        "Email": `${order.email}`,
        "Name": `${order.name} ${order.lastname}`
      }
    ],
    TemplateID: 2197408, //new  order
    Subject: "Заказ оформлен успешно",
    Variables: {
      name: `${order.name} ${order.lastname}`,
      order_price: order.summ,
      order_date: new Date(order.date),
      order_id: order._id,
      order_cash_text: currGallery.payment === 'cash' ? currUser.payment.cashText : ''
    }
  }

  mailer(payload)
  res.send({ msg: 'Заказ создан успешно', order })

}
