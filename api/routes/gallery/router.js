const controllers = require('./controllers')

router
  .post('/add', middleware.verify.default, controllers.createGallery)
  .get('/get/:id', controllers.getOneGallery)
  .get('/get/user/galleries', middleware.verify.default, controllers.getAllGalleries)
  .put('/change/:id', middleware.verify.default, controllers.changeGallery)
  .delete('/delete/:id', middleware.verify.default, controllers.deleteGallery)

module.exports = router