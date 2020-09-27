const controllers = require('./controllers')

router
  .post('/google', controllers.googleAuth)
  .get('/verify', middleware.verify.default, controllers.getUser)
  .get('/get-public-user/:id', controllers.getPublicUser)
  .put('/user/change', middleware.verify.default, controllers.changeUser)
    
module.exports = router