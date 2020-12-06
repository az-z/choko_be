module.exports = async (req, res) => {
  try {
    console.log("BODY: ", req.body)
    console.log("HEADER: ", req.headers)
    console.log("QUERY: ", req.query)
  } catch (error) {
    console.error(error)
  }
}