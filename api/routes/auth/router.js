const controllers = require('./controllers')

router
  .post('/google', controllers.googleAuth)

module.exports = router