const controllers = require('./controllers')

router.get('/get/public/:id', controllers.getPublicGallery)
router.get('/get/:id', middleware.verify.default, controllers.getOneGallery)
router.post('/add', middleware.verify.default, controllers.createGallery)
router.get('/get/user/galleries', middleware.verify.default, controllers.getAllGalleries)
router.put('/change/:id', middleware.verify.default, controllers.changeGallery)
router.delete('/delete/:id', middleware.verify.default, controllers.deleteGallery)
router.post('/add-images', middleware.verify.default, middleware.multer.array('images', 200000), controllers.createImages)
router.delete('/remove/file/:gallery/:id', middleware.verify.default, controllers.removeOneFile) 

module.exports = router