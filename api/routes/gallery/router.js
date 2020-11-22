const controllers = require('./controllers')

router
  .get('/get/public/:id', controllers.getPublicGallery)
  .get('/get/:id',middleware.verify.default, controllers.getOneGallery)
  .post('/add',middleware.verify.default, controllers.createGallery)
  .get('/get/user/galleries',middleware.verify.default, controllers.getAllGalleries)
  .put('/change/:id',middleware.verify.default, controllers.changeGallery)
  .delete('/delete/:id',middleware.verify.default, controllers.deleteGallery)
  .post('/add-images',middleware.verify.default, middleware.multer.array('images', 200), controllers.createImages)
  .delete('/remove/file/:gallery/:id',middleware.verify.default, controllers.removeOneFile) 

module.exports = router