const { base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const data = base64decode(req.body.data)
    const payment = await db.Payments.findOne({ _id: data.order_id })
    const user = await db.User.findOne({ _id: payment.user })
    if ( payment.description === 'month' ) {
      user.active.status = active
      const date = new Date()
      user.active.to = new Date(date.setMonth(date.getMonth()+8))
      const saveUser = await user.save()
    }
    if ( payment.description === 'month' ) {
      user.active.status = active
      const date = new Date()
      user.active.to = date.setFullYear(date.getFullYear() + 1)
      const saveUser = await user.save()
    }
    res.send({ msg: 'Усешно' })
  } catch (error) {
    res.status(500).send({ msg: 'Ошибка сервера' })
    console.error(error)
  }
}