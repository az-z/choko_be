const controllers = require('./controllers')

router
  .get('/get-one/:id', controllers.getOneOrder)
  .get('/get-all', controllers.getAllOrders)
  .get('/get-user-orders', middleware.verify.default, controllers.userOrders)
  .post('/create', controllers.addOrder)
  .delete('/remove/:id', middleware.verify.default, controllers.removeOrder)
  .put('/change-order/:id', middleware.verify.default, controllers.changeOrder)
  .post('/html', controllers.createLiqpayPayment)
  .post('/responseliqpay', controllers.responseLiqpay)

module.exports = router