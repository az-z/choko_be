module.exports = async (req, res) => {
  const orders = await db.Orders.find({}).populate(['images']).select(['images id'])
  if (!orders || orders.length === 0) return res.status(404).send({ msg: 'Неудалось найти заказы' })
  res.send({ msg: 'Заказы найдены', orders })
}