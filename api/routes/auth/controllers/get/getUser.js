module.exports = async (req, res) => {
  const user = await db.Users.findOne({_id: req.user_id})
  delete user._doc.password
  res.send({user, msg: "Авторизация успешна"})
}