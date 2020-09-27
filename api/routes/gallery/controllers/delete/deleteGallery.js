const { Types } = require('mongoose')
module.exports = async (req, res) => {
  const user = req.user
  const resultatDelet = await db.Galleries.deleteOne({ _id: req.params.id, creator: user._id })
  if (!resultatDelet.ok) return res.status(500).send({ msg: 'Неудалось удалить галерею', resultatDelet })
  user.galleries = user.galleries.filter(element => element != req.params.id)
  user.save().then(resultatSave => {
    res.send({ msg: 'Галерея удалена успшно' })
  }).catch(error => {
    res.status(500).send({ msg: 'Неудалось внести изменения в пользователя', error })
  })
}