module.exports = async (req, res) => {
  const user = await db.Users.findOne({ _id: req.user._id }).select('_id name email picture description facebook phoneNumber site')
  res.send({ user: user, msg: "Авторизация успешна" })
}