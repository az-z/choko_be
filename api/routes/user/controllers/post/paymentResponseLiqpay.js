module.exports = async (req, res) => {
  try {
    console.log("BODY: ", req.body)
    console.log("HEADER: ", req.header)
  } catch (error) {
    console.error(error)
  }
}