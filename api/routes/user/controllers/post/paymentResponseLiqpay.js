const { base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const data = JSON.parse(base64decode(req.body.data))
    const payment = await db.Payments.findOne({ _id: data.order_id })
    const user = await db.Users.findOne({ _id: payment.user })
    console.log('USER: ', user.active.to);
    const currUserDate = new Date(user.active.to)
    console.log('CurrUserDate: ', currUserDate);
    const date = new Date()
    if ( data.description === 'month' && payment.status === false ) {
      // console.log('New date: ', currUserDate > date ? new Date(currUserDate.setMonth(currUserDate.getMonth() + 1)) : dateMonth);
      const dateMonth = new Date(date.setMonth(date.getMonth() +1 ))
      user.active.to = currUserDate > date ? new Date(currUserDate.setMonth(currUserDate.getMonth() + 1)) : dateMonth
      user.active.status = true
      user.active.trial = false
      payment.status = true
      const paymentSave = await payment.save()
      const saveUser = await user.save()
      console.log("Saved month", saveUser);
    }
    if ( data.description === 'year' && payment.status === false ) {
      const dateYear = new Date(date.setFullYear(date.getFullYear() + 1))
      user.active.to = currUserDate.getFullYear() > date.getFullYear() ? new Date(currUserDate.setFullYear(currUserDate.getFullYear() + 1)) : dateYear
      // console.log('Year + 1: ', currUserDate > date ? new Date(currUserDate.setFullYear(currUserDate.getFullYear() + 1)) : dateYear, '|', new Date(currUserDate.setFullYear(currUserDate.getFullYear() + 1)))
      user.active.trial = false
      user.active.status = true
      payment.status = true
      const paymentSave = await payment.save()
      const saveUser = await user.save()
      console.log("Saved year", saveUser.active.date);
    }
    console.log('111111111111111');
    res.send({ msg: 'Усешно' })
  } catch (error) {
    res.status(500).send({ msg: 'Ошибка сервера' })
    console.error(error)
  }
}