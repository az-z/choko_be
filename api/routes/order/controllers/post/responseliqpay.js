require('dotenv').config()
const { base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const data = JSON.parse(base64decode(req.body.data))
    if (!data.order_id) return res.status(403).json({ msg: "Неверные данные" })
    const order = await db.Orders.findOne({ _id: data.order_id })
    order.status = true
    await order.save()
    const message = {
      to: order.email,
      subject: 'Заказ успешно оплачен',
      text: `Ваш заказ доступен по ссылке: ${process.env.SITE}/order/${order._id}`
    }
    mailer(message)
    res.send({ msg: 'Усешно' })
  } catch (error) {
    res.status(500).send({ msg: 'Ошибка сервера' })
    console.error(error)
  }
}