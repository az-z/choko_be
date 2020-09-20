module.exports = async (req, res) => {
  const user = await db.Users.findOne({_id: req.user._id}).populate(['galleries'])
  res.send({user: user, msg: "Авторизация успешна"})
}