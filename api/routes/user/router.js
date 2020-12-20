const controllers = require('./controllers')

router
  .get('/statuses/getpayments', middleware.verify.default, controllers.getHtmlPayments)
  .post('/responseliqpay', controllers.paymentResponseLiqpay)
  .put('/changepaymentcashtext', middleware.verify.default, controllers.changePaymentCashText)
  
module.exports = router