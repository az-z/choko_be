const { decodeBase64 } = require("bcryptjs")

module.exports = async (req, res) => {
  const user = await db.Users.findOne({ _id: req.params.id }).select('_id name email galleries picture description facebook site')
    .populate([{ path: 'galleries', match: { activity: { $gte: true } }, populate: 'images' }])
  if (!user) return res.status(422).send({ msg: 'Нудалось найти пользователя' })
  res.send({ msg: 'Пользователь успешно найден', user })
}