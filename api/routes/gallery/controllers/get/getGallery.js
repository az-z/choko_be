module.exports = async (req, res) => {
  const { id } = req.params
  const gallery = await db.Galleries.findOne({_id: id})
  if (!gallery) return res.status(404).send({
    msg: 'Галлерея с таким id не найденна'
  })
  res.send({ msg: 'Галерея найденна', gallery })
}