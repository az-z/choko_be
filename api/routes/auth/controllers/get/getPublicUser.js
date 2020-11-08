module.exports = async (req, res) => {
  try {
    const user = await db.Users.findOne({ $or: [{ login: req.params.id }] })
      .select('_id name email galleries picture description facebook site instagram')
      .populate([{ path: 'galleries', match: { activity: { $gte: true } }, populate: 'images' }])
    res.send({ msg: 'Пользователь успешно найден', user })
  } catch (error) {
    res.status(422).send({ msg: 'Неудалось найти пользователя' })
  }
}