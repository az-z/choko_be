const { Types } = require('mongoose')
const LiqPay = require('../../../../../plugins/liqpay')
require('dotenv').config()
module.exports = async (req, res) => {
  try {
    const payment = new db.Payments({
      _id: new Types.ObjectId(),
      user: req.user._id
    })
    const save = await payment.save()
    const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC, process.env.LIQPAY_PRIVAT)
    var first = await liqpay.cnb_form({
      'action'         : 'pay',
      'amount'         : '1',
      'currency'       : 'UAH',
      'description'    : 'month',
      'order_id'       : payment._id,
      'version'        : '3',
      'result_url'     : process.env.SITE + '/profile',
      'server_url'     : process.env.FULL_PATH + '/user/responseliqpay'
    })
    var second = await liqpay.cnb_form({
      'action'         : 'pay',
      'amount'         : '2',
      'currency'       : 'UAH',
      'description'    : 'year',
      'order_id'       : payment._id,
      'version'        : '3',
      'result_url'     : process.env.SITE + '/profile',
      'server_url'     : process.env.FULL_PATH + '/user/responseliqpay'
    })
    res.send({ first, second })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Ошибка сервера' })
  }
}