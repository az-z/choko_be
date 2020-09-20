const axios = require('axios')
const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res) => {
  const access_token = req.body.googleUser.wc.access_token
  getUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
  axios.get(getUrl).then(async response => {
    const user = await db.Users.findOne({googleID: response.data.id})
    if (user) {
      const token = await jwt.sign({_id: user._id}, process.env.SECRET_KEY)
      user.access_token = access_token
      return user.save().then(response => {
        res.send({ user, token, msg: "Авторизация успешна" })
      }).catch(error => {
        res.status(500).send({ msg: 'Не удалось сохранить', error })
      })
    }
    const newUser = new db.Users({
      _id: new Types.ObjectId(),
      name: response.data.name,
      email: response.data.email,
      googleID: response.data.id,
      access_token,
      picture: response.data.picture,
      locale: response.data.locale,
      verified_email: response.data.verified_email
    })
    newUser.save().then(async resultat => {
      const token = await jwt.sign({_id: newUser._id}, process.env.SECRET_KEY, { expiresIn: '10h' })
      res.send({user: resultat, token, msg: "Пользователь успешно добавлен"})
    }).catch(error => {
      res.status(500).send({
        msg: "Ошибка сервера. Неудалось схранить пользователя SS",
        error
      })
    })
  }).catch(error => {
    console.error(error)
    res.status(500).send({msg: 'Не удалось загрузить'})
  })
}