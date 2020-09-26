const controllers = require('./controllers')

router
  .post('/add', middleware.verify.default, controllers.createGallery)
  .get('/get/:id', controllers.getOneGallery)
  .get('/get/user/galleries', middleware.verify.default, controllers.getAllGalleries)

module.exports = router