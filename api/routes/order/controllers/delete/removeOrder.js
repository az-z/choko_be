module.exports = async (req, res) => {
  const { id } = req.params
  if(!id) return res.status(400).json({ msg: 'Некоректный id' })
  try {
    const order = await db.Orders.findOne({ _id: id, user: req.user._id })
    if (!order) return res.status(404).json({ msg: 'Заказ не найден' })
    const removeResultat = await order.remove()
    if (!removeResultat) return res.status(500).json({ msg: 'Неудалось удалить заказ' })
    req.user.orders = req.user.orders.filter(element => element !== id)
    const userResult = await req.user.save()
    if (!userResult) return res.status(500).json({ msg: 'Неудалось очистить пользователя' })
    res.json({ msg: 'Заказ удален успешно' })
  } catch (error) {
    console.error(error)
    res.status(404).json({ error, msg: 'Заказ не найден' })
  }
}