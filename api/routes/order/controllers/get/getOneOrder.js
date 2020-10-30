module.exports = async (req, res) => {
  const { id } = req.params
  const order = await db.Orders.findOne({ _id: id,  }).populate(['images']).select(['images _id'])
  if (!order) return res.status(404).send({ msg: 'Заказ с таким id не найден' })
  res.send({ msg: 'Заказ найден', order })
}