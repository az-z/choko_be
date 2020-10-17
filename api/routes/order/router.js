const controllers = require('./controllers')

router
  .get('/get-one/:id', controllers.getOneOrder)
  .get('/get-all', controllers.getAllOrders)
  .post('/add', middleware.verify.default, controllers.addOrder)

module.exports = router