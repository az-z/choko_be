const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send({msg: "Нет токена"})
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).send({msg: "Авторезируйтесь для продолжения работы"})
    const payload = await jwt.verify(token, process.env.SECRET_KEY)
    if (!payload) return res.status(401).send({msg: "Неверный токен", token, payload})
    const user = await db.Users.findOne({ _id: payload._id})
    if (!user) return res.status(401).send({msg: "Данного ююзера не существует =("})
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ msg: 'Неверная авторизация' })
  }
}