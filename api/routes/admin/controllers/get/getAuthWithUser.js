const { decodeBase64 } = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const user = await db.Users.findOne({ _id: id })
    if (!user) return res.status(404).json({ msg: 'Пользователь ненайден' })
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    if (!token) return res.status(500).send({ msg: 'Неудалось сгенерировать токен' })
    res.send({ token, user, msg: 'Добро пожаловть Admin' })
  } catch (error) {
    res.status(500).json({
      msg: 'Ошибка сервера'
    })
    console.error(error)
  }
}