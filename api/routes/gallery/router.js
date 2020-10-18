const controllers = require('./controllers')

router
  .get('/get/public/:id', controllers.getPublicGallery)
  .use(middleware.verify.default)
  .get('/get/:id', controllers.getOneGallery)
  .post('/add', controllers.createGallery)
  .get('/get/user/galleries', controllers.getAllGalleries)
  .put('/change/:id', controllers.changeGallery)
  .delete('/delete/:id', controllers.deleteGallery)
  .post('/add-images', middleware.multer.array('images', 20), controllers.createImages)
  .delete('/remove/file/:gallary/:id', controllers.removeOneFile) 

module.exports = router