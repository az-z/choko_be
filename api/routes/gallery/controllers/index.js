module.exports = {
  createGallery: require('./post/createGallery'),
  getOneGallery: require('./get/getGallery'),
  getAllGalleries: require('./get/getAllGaleries'),
  changeGallery: require('./put/changeGallery'),
  deleteGallery: require('./delete/deleteGallery'),
  createImages: require('./post/createFiles'),
  removeOneFile: require('./delete/removeOneFile'),
  getPublicGallery: require('./get/getPublicGallery')
}