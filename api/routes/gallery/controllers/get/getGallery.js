module.exports = async (req, res) => {
  const { id } = req.params
  const gallery = await db.Galleries.findOne({ _id: id, creator: req.user._id })
    .populate([{ path: 'images', select: 'path.original originalName' }, 'creator'])
  if (!gallery) return res.status(404).send({ msg: 'Галлерея с таким id не найденна' })
  res.send({ msg: 'Галерея найденна', gallery })
}