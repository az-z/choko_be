const { encodeBase64 } = require("bcryptjs")

module.exports = async (req, res) => {
  try {
    const buff = new Buffer(req.body.data, 'base64')
    console.log("BODY: ", buff)
    console.log("HEADER: ", req.headers)
    console.log("QUERY: ", req.query)
    console.log("order_id: ", req.order_id)
    console.log("DATA: ", req.data)
  } catch (error) {
    console.error(error)
  }
}