const { Types } = require('mongoose')
const LiqPay = require('../../../../../plugins/liqpay')
require('dotenv').config()
module.exports = async (req, res) => {
  const { orderId, summ } = req.body
  try {
    const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC, process.env.LIQPAY_PRIVAT)
    var html = await liqpay.cnb_form({
      'action'         : 'pay',
      'amount'         : summ,
      'currency'       : 'UAH',
      'description'    : 'month',
      'order_id'       : orderId,
      'version'        : '3',
      'result_url'     : process.env.SITE,
      'server_url'     : process.env.FULL_PATH + '/order/responseliqpay'
    })
    res.send({ html })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Ошибка сервера' })
  }
}