const { base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const data = JSON.parse(base64decode(req.body.data))
    const payment = await db.Payments.findOne({ _id: data.order_id })
    const user = await db.Users.findOne({ _id: payment.user })
    const currUserDate = new Date(user.active.to)
    const currentDate = new Date()
    if ( data.description === 'month' && payment.status === false ) {
      const date = new Date()
      const dateMonth = new Date(date.setMonth(date.getMonth() +1 ))
      user.active.to = currUserDate > currentDate ? new Date(currUserDate.setMonth(currUserDate.getMonth() + 1)) : dateMonth
      user.active.status = true
      user.active.trial = false
      payment.status = true
      const paymentSave = await payment.save()
      const saveUser = await user.save()
    }
    if ( data.description === 'year' && payment.status === false ) {
      const date = new Date()
      const dateYear = new Date(date.setFullYear(date.getFullYear() + 1))
      user.active.to = currUserDate > currentDate ? new Date(currUserDate.setFullYear(currUserDate.getFullYear() + 1)) : dateYear
      user.active.trial = false
      user.active.status = true
      payment.status = true
      const paymentSave = await payment.save()
      const saveUser = await user.save()
    }
    res.send({ msg: 'Усешно' })
  } catch (error) {
    res.status(500).send({ msg: 'Ошибка сервера' })
    console.error(error)
  }
}