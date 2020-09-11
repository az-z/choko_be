const controllers = require('./controllers')

router
  .post('/google', controllers.googleAuth)
  .get('/verify', middleware.verify.default, controllers.getUser)

module.exports = router