const controllers = require('./controllers')

router
  .post('/google', controllers.googleAuth)
  .get('/verify', middleware.verify.default, controllers.getUser)
  .get('/get-public-user/:id', controllers.getPublicUser)
    
module.exports = router