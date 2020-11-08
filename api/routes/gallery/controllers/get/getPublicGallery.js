module.exports = async (req, res) => {
  const { id } = req.params
  const gallery = await db.Galleries.findOne({ _id: id })
    .populate([{ path: 'images', select: 'path.small' }, 'creator'])
  if (!gallery) return res.status(404).json({ msg: 'Галлерея с таким id не найденна' })
  res.send({ msg: 'Галерея найденна', gallery })
}