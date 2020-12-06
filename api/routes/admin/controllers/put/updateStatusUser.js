module.exports = async (req, res) => {
  const { active, date } = req.body
  try {
    const user = await db.Users.findOne({ _id: req.params.id })
    user.active.status = active
    user.active.to = new Date(date)
    const saveUser = await user.save()
    res.send({ user, msg: 'Пользователь сохранет' })
  } catch (error) {
    res.status(500).send({ msg: 'Неудалось изменить статус пользователя' })
    console.error(error)
  }
}