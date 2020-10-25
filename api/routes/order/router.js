const controllers = require('./controllers')

router
  .get('/get-one/:id', controllers.getOneOrder)
  .get('/get-all', controllers.getAllOrders)
  .get('/get-user-orders',middleware.verify.default, controllers.userOrders)
  .post('/create', controllers.addOrder)

module.exports = router