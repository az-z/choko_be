module.exports = async (req, res) => {
  const { id } = req.params
  if (!id) res.status(400).json({ msg: 'ID обязательно' })
  try {
    const order = await db.Orders.findOne({ _id: id })
    .populate([{ path: 'images', select: 'path.original' }]).select(['images', '_id'])
    if (!order) return res.status(404).send({ msg: 'Заказ с таким id не найден' })
    if (order.status === false) return res.status(402).json({ msg: 'Заказ неолачен или нходится в обработке' })
    res.send({ msg: 'Заказ найден', order })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Что-то аошло не так' })
  }
}