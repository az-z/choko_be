const controllers = require('./controllers')

router
  .use(middleware.verify.admin)
  .get('/users/get/all', controllers.getAllUsers)
    
module.exports = router