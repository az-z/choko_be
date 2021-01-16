module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const gallery = await db.Galleries.findOne({ _id: id })
      .populate([{ path: 'images', select: 'path.small path.xs originalName' }, 'creator'])
    if (!gallery) return res.status(404).json({ msg: 'Галлерея с таким id не найденна' })
    if (!gallery.creator.active.status) return res.status(403).send({ msg: 'Пользователь не актевирован' })
    res.send({ msg: 'Галерея найденна', gallery })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Что то погло не так' })    
  }
}