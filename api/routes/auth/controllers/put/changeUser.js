module.exports = async (req, res) => {
  const { description, phoneNumber, site, facebook, instagram, login } = req.body
  try {
    const user = await db.Users.findOne({ _id: req.user._id })
    const userWithLogin = await db.Users.findOne({ login: login })
    if( userWithLogin && userWithLogin.login !== user.login ) return res.status(400).json({ msg: 'Пользователь с таким ником уже существует' })
    else user.login = login
    user.description = description
    user.facebook = facebook
    user.site = site
    user.phoneNumber = phoneNumber
    user.instagram = instagram
    console.log(user);
    const resultat = await user.save()
    res.send({ msg: 'Пользователь изменен успешно', user: resultat })
  } catch (error) {
    res.status(500).send({ msg: 'Неудалось изменить пользователя', error })
  }
}