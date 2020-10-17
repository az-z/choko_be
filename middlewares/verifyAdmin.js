const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send({ msg: "Нет токена" })
  const token = req.headers.authorization.split(' ')[1]
  if (!token) return res.status(401).send({ msg: "Авторезируйтесь для продолжения работы" })
  const payload = await jwt.verify(token, process.env.SECRET_KEY)
  if (!payload) return res.status(401).send({ msg: "Неверный токен", token, payload })
  next()
}