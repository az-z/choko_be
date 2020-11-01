module.exports = async (req, res) => {
  const { take, skip } = req.query
  try {
    const users = await db.Users.find({}).limit(take).skip(skip)
    if(!users) return res.status(404).json({ msg: "Пользователи ненайдены" })
    res.json({
      msg: 'Пользователи найденны успешно',
      users
    })
  } catch (error) {
    res.send(500).json({ msg: "Что-то пошло не так" })
  }
}