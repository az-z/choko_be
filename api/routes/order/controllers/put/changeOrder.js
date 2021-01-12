module.exports = async (req, res) => {
  const { id } = req.params
  const { name, email, lastname, phone, status } = req.body
  if (!id) return res.status(400).json({ msg: 'Требуется id' })
  if (!name) return res.status(400).send({ msg: 'Имя обязательно' })
  if (!email) return res.status(400).send({ msg: 'E-mail обязателен' })
  try {
    const order = await db.Orders.findOne({ _id: id, user: req.user._id })
    if (!order) return res.status(404).json({ msg: 'Заказ ненайден' })
    order.email = email
    order.name = name
    order.lastname = lastname
    order.phone = phone
    order.status = status
    const orderResult = await order.save()
    if (!orderResult) return res.status(500).json({ msg: 'Неудалось сохранить' })
    // if (status) {
    //   // const message = {
    //   //   to: order.email,
    //   //   subject: 'Заказ успешно оплачен',
    //   //   text: `Ваш заказ доступен по ссылке: ${process.env.SITE}/order/${order._id}`
    //   // }
    //   // mailer(message)
    // }
    
    const payload = {
    			"To": [
        			{
         			"Email": `${order.email}`,
         			"Name": `${order.name} ${order.lastname}`
        			}
      			],
			TemplateID: 2204734, //completed order
			"Subject": "Заказ успешно изменен",
			"Variables": {
				"name": `${order.name} ${order.lastname}`,
				"order_url": `${process.env.SITE}/order/${order._id}`,
      				"order_price": `${order.summ}`,
      				"order_date": `${order.date}`,
      				"order_id": `${order._id}`
			}
    	}
	mailer(payload);
	
    res.json({ msg: 'Заказ изменен успешно' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Ошибка сервера' })
  }
}
