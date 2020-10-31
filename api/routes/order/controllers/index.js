module.exports = {
  getOneOrder: require('./get/getOneOrder'),
  getAllOrders: require('./get/getAllOrders'),
  addOrder: require('./post/addOrder'),
  userOrders: require('./get/getUserOrders'),
  removeOrder: require('./delete/removeOrder'),
  changeOrder: require('./put/changeOrder')
}