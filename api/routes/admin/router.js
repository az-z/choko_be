const controllers = require('./controllers')

router
  .get('/users/get/all',middleware.verify.admin, controllers.getAllUsers)
  .get('/authwithuser/:id', middleware.verify.admin, controllers.getAuthWithUser)
  .put('/user/change/status/:id', middleware.verify.admin, controllers.changeUserStatus)
    
module.exports = router