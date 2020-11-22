const { decodeBase64 } = require("bcryptjs")

module.exports = async (req, res) => {
  const { login } = req.params
  if (!login) return res.status(401).json({ msg: 'Заполните все данные' })
  const user = await db.Users.findOne({ login })
  if (!user) return res.json({ msg: 'Логин доступен' })
  res.status(401).json({ msg: 'Логин недоступен ' })
}