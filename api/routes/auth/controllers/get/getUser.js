module.exports = async (req, res) => {
  const user = await db.Users.findOne({_id: req.user_id})
  if (!user) return res.status(401).send({msg: 'Вы не авторезированы'})
  res.send({user, msg: "Авторизация успешна"})
}