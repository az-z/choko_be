const { base64encode, base64decode } = require('nodejs-base64');
module.exports = async (req, res) => {
  try {
    const buff = base64decode(req.body.data)
    console.log("BODY: ", buff)
    console.log("HEADER: ", req.headers)
    console.log("QUERY: ", req.query)
    console.log("order_id: ", req.order_id)
    console.log("DATA: ", req.data)
  } catch (error) {
    console.error(error)
  }
}