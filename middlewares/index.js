module.exports = {
  verify: {
    default: require('./verify'),
    superAdmin: require('./verifySuperAdmin'),
    admin: require('./verifyAdmin')
  },
  multer: require('./multer'),
  resizeImages: require('./resizeImage')
}