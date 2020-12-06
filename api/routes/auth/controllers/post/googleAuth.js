const axios = require('axios')
const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res) => {
  const access_token = req.body.googleUser.xc.access_token
  getUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
  try {
    const response = await axios.get(getUrl)
    const user = await db.Users.findOne({ googleID: response.data.id })
    if (user) {
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
      user.access_token = access_token
      const userSave = await user.save()
      res.send({ user: userSave, token, msg: "Авторизация успешна" })
    } else {
      const date = new Date()
      const newUser = new db.Users({
        _id: new Types.ObjectId(),
        name: response.data.name,
        email: response.data.email,
        googleID: response.data.id,
        access_token,
        picture: response.data.picture,
        locale: response.data.locale,
        verified_email: response.data.verified_email,
        login: response.data.email.split('@')[0],
        active: {
          status: true,
          trial: true,
          to: new Date(date.setMonth(date.getMonth() + 1))
        }
      })
      const newUserSave = await newUser.save()
      const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '10h' })
      res.send({ user: newUserSave, token, msg: "Пользователь успешно добавлен" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      msg: "Ошибка сервера. Неудалось схранить пользователя SS",
      error
    })
  }
}