const controllers = require('./controllers')

router
  .post('/google', controllers.googleAuth)
  .get('/verify', middleware.verify.default, controllers.getUser)
  .get('/get-public-user/:id', controllers.getPublicUser)
  .put('/user/change', middleware.verify.default, controllers.changeUser)
  .post('/admin/signin', controllers.authAdmin)
  .get('/admin/verify', middleware.verify.admin, controllers.verifyAdmin)
  .get('/checklogin/:login', middleware.verify.default, controllers.checkLogin)
  
module.exports = router