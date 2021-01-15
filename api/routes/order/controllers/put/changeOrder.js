module.exports = async (req, res) => {
	const { id } = req.params
	const { name, email, lastname, phone, status, summ } = req.body
	if (!id) return res.status(400).json({ msg: 'Требуется id' })
	if (!name) return res.status(400).send({ msg: 'Имя обязательно' })
	try {
		const order = await db.Orders.findOne({ _id: id, user: req.user._id }).populate(['gallery'])
		if (!order) return res.status(404).json({ msg: 'Заказ ненайден' })
		order.email = email
		order.name = name
		order.lastname = lastname
		order.phone = phone
		order.status = status
		//order.summ = summ 
		const orderResult = await order.save()
		if (!orderResult) return res.status(500).json({ msg: 'Неудалось сохранить' })
		// the user will receive new order and paid order email notifications.
		//	If payment === 'cash' && order.status { add URL to the template }
		if (status) {			
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
					"order_date": `${order.date}`,
					"order_id": `${order._id}`
				}
			}

			mailer(payload)
		}

		res.json({ msg: 'Заказ изменен успешно' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ msg: 'Ошибка сервера' })
	}
}

		// if (status) {
		//   // const message = {
		//   //   to: order.email,
		//   //   subject: 'Заказ успешно оплачен',
		//   //   text: `Ваш заказ доступен по ссылке: ${process.env.SITE}/order/${order._id}`
		//   // }
		//   // mailer(message)
		// }

		// const order_payment = await db.Orders.aggregate([
		// 	{ $match: { _id: id } },
		// 	{
		// 		$lookup: {
		// 			from: 'galleries',
		// 			localField: 'gallery',
		// 			foreignField: '_id',
		// 			as: 'gal'
		// 		}
		// 	},
		// 	{ $project: { 'gal.payment': 1 } }
		// ], function (err, result) {
		// 	console.error(err)
		// })
		// console.log(" order_payment - ", order_payment)
		// console.log(" order_payment.gal - ", order_payment.gal)
		// console.log(" order_payment.gal.payment - ", order_payment.gal.payment)

