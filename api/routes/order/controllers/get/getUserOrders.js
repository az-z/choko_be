module.exports = async (req, res) => {
    const orders = await db.Orders.find({ user: req.user._id })
        .populate(['images']).limit(10).sort('-date')
    if (!orders) return res.status(500).send({ msg: 'Неудалось найти неодного заказа' })
    if (orders.length < 1) return res.send({ orders, msg: 'Нет заказов' })
    res.send({ orders, msg: 'Заказы успешно найдены' })
}