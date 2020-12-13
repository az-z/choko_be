const { base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const data = JSON.parse(base64decode(req.body.data))
    const payment = await db.Payments.findOne({ _id: data.order_id })
    const user = await db.Users.findOne({ _id: payment.user })
    const currUserDate = await new Date(user.active.to)
    const date = await new Date()
    if ( data.description === 'month' ) {
      const dateMonth = new Date(date.setMonth(date.getMonth()+1))
      user.active.to = currUserDate <= date ? dateMonth : new Date(currUserDate.setMonth(currUserDate.getMonth() + 1))
      user.active.status = true
      user.active.trial = false
      payment.status = true
      const paymentSave = await payment.save()
      const saveUser = await user.save()
      console.log("Saved month");
    }
    if ( data.description === 'year' ) {
      const dateYear = new Date(date.setFullYear(date.getFullYear() + 1))
      user.active.to = currUserDate <= date ? dateYear : new Date(currUserDate.setFullYear(currUserDate.getFullYear() + 1))
      user.active.trial = false
      user.active.status = true
      payment.status = true
      const paymentSave = await payment.save()
      const saveUser = await user.save()
      console.log("Saved year");
    }
    console.log('111111111111111');
    res.send({ msg: 'Усешно' })
  } catch (error) {
    res.status(500).send({ msg: 'Ошибка сервера' })
    console.error(error)
  }
}