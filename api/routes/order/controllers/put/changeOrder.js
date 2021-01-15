module.exports = async (req, res) => {
	const { id } = req.params
	const { name, email, lastname, phone, status } = req.body
	if (!id) return res.status(400).json({ msg: 'Требуется id' })
	if (!name) return res.status(400).send({ msg: 'Имя обязательно' })
	if (!email) return res.status(400).send({ msg: 'E-mail обязателен' })
	try {
		const order = await db.Orders.findOne({ _id: id, user: req.user._id }).populate(['gallery'])
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




		// this is not working . throws :
		// TypeError: Cannot read property 'aggregate' of undefined
		// 0|back  |     at module.exports (/home/az/KeytoPhoto/back/api/routes/order/controllers/put/changeOrder.js:27:35)
		// 0|back  |     at processTicksAndRejections (internal/process/task_queues.js:93:5)
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




		//	If payment === 'cash' && order.status { add URL to the template }
		if (status) {
			const url = `${process.env.SITE}/order/${order._id}`
			const order_text = order.gallery.payment == 'cash' ? req.user.payment.cashText : 'Your order is paid and available'
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
					order_stmnt: `${order_text}`,
					"order_url": `${url}`,
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
