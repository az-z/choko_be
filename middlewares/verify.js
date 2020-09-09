const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send({msg: "Нет токена"})
  const token = req.headers.authorization.split(' ')[1]
  if (!token) return res.status(401).send({msg: "Авторезируйтесь для продолжения работы"})
  const payload = await jwt.verify(token, process.env.SECRET_KEY)
  if (!payload) return res.status(401).send({msg: "Неверный токен", token, payload})
  req.user_id = payload._id
  const user = await db.Users.findOne({ _id: payload._id})
  if (!user) return res.status(401).send({msg: "Данного ююзера не существует =("})
  next()
}