const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = async (req, res) => {
  const { login, password } = req.body
  if (!login) return res.status(400).send({ msg: 'Логин обязателен' })
  if (login !== process.env.ADMIN_LOGIN) return res.status(400).send({ msg: 'Неверный логин' })
  if (!password) return res.status(400).send({ msg: 'Пароль обязателен' })
  if (password !== process.env.ADMIN_PASSWORD) return res.status(400).send({ msg: 'Неверный пароль' })
  try {
    const token = await jwt.sign({}, process.env.SECRET_KEY_ADMIN )
    if (!token) return res.status(500).send({ msg: 'Неудалось сгенерировать токен' })
    res.send({ token, msg: 'Добро пожаловть Admin' })
  } catch (error) {
    res.status(500).json({
      msg: 'Ошибка сервера'
    })
  }
}