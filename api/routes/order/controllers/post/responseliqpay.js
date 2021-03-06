require('dotenv').config()

const { base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const data = JSON.parse(base64decode(req.body.data))
    if (!data.order_id) return res.status(403).json({ msg: "Order ID is missing" })
    const order = await db.Orders.findOne({ _id: data.order_id }).populate(['user'])
    order.status = true
	await order.save()
	// order.user - User info
	const payload = {
    			"To": [
        			{
         			"Email": `${order.email}`,
         			"Name": `${order.name} ${order.lastname}`
        			}
      			],
			TemplateID: 2204070, //completed order
			"Subject": "Заказ успешно оплачен",
			"Variables": {
				"name": `${order.name} ${order.lastname}`,
				"order_url": `${process.env.SITE}/order/${order._id}`,
      				"order_price": `${order.summ}`,
      				"order_date": `${new Date(order.date)}`,
      				"order_id": `${order._id}`
			}
    	}

    mailer(payload) 
    res.send({ msg: 'Успешно' })
  } catch (error) {
    	res.status(500).send({ msg: 'Ошибка сервера' })
    	console.error(error)
  }
}
