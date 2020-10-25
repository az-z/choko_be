module.exports = async (req, res) => {
    const orders = await db.Orders.find({ user: req.user._id }).populate(['images'])
    if (!orders) return res.status(500).send({ msg: 'Неудалось найти неодного заказа' })
    res.send({ orders, msg: 'Заказы успешно найдены' })
}