module.exports = {
  googleAuth: require('./post/googleAuth'),
  getUser: require('./get/getUser'),
  getPublicUser: require('./get/getPublicUser'),
  changeUser: require('./put/changeUser'),
  authAdmin: require('./post/authAdmin'),
  verifyAdmin: require('./get/verifyAdmin'),
  checkLogin: require('./get/checklogin')
}