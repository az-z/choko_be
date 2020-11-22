const controllers = require('./controllers')

router
  .use(middleware.verify.admin)
  .get('/users/get/all', controllers.getAllUsers)
  .get('/authwithuser/:id', controllers.getAuthWithUser)
    
module.exports = router