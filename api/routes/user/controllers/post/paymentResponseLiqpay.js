const { json } = require('body-parser');
const { base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const data = JSON.parse(base64decode(req.body.data))
    const payment = await db.Payments.findOne({ _id: data.order_id })
    // console.log(payment)
    const user = await db.Users.findOne({ _id: payment.user })
    const currUserDate = new Date(user.active.to)
    if ( data.description === 'month' ) {
      const date = new Date()
      const dateMonth = new Date(date.setMonth(date.getMonth()+1))
      user.active.to = currUserDate < date ? dateMonth : new Date(currUserDate.setMonth(date.getMonth()+1))
      user.active.status = true
      payment.status = true
      // console.log('user :', user);
      const paymentSave = payment.save()
      const saveUser = await user.save()
    }
    if ( data.description === 'year' ) {
      payment.status = true
      const date = new Date()
      user.active.status = true
      // user.active.to = date.setFullYear(date.getFullYear() + 1)
      user.active.to = new Date(user.active.to) < date ? new Date(date.setFullYear(date.getFullYear() + 1)) : new Date(user.active.to) + new Date(date.setFullYear(date.getFullYear() + 1))
      
      // console.log('user :', user);
      const paymentSave = payment.save()
      const saveUser = await user.save()
    }
    res.send({ msg: 'Усешно' })
  } catch (error) {
    res.status(500).send({ msg: 'Ошибка сервера' })
    console.error(error)
  }
}