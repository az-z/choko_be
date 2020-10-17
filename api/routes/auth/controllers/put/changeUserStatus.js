module.exports = async (req, res) => {
  const { status, _id } = req.body
  if (!status) return res.status(400).send({ msg: 'Статус не передан' })
  if (!_id) return res.status(400).send({ msg: 'id не передан' })
  const user = await db.Users.findOne({ _id })
  user.status = status
  user.save().then(resultat => {
    res.send({ user: resultat, msg: 'Статус пользователя успешно изменен' })
  }).catch(error => {
    res.status(500).send({ error, msg: 'Неудалось изменить статус пользователя' })
  })
} 