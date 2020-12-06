const controllers = require('./controllers')

router
  .get('/statuses/getpayments', middleware.verify.default, controllers.getHtmlPayments)
  .post('/responseliqpay', controllers.paymentResponseLiqpay)
  
module.exports = router