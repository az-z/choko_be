module.exports = async (req, res) => {
  const { description, phoneNumber, site, facebook } = req.body
  const currPhoneNumber = phoneNumber
  const user = await db.Users.findOne({ _id: req.params.id, creator: req.user._id })
  user.description = description
  user.facebook = facebook
  user.site = site
  user.phoneNumber = currPhoneNumber
  user.save().then(response => {
    res.send({ msg: 'Пользователь изменен успешно', user: response })
  }).catch(error => {
    res.status(500).send({ msg: 'Неудалось изменить пользователя', error })
  })
}