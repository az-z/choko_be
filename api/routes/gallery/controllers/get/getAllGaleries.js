module.exports = async (req, res) => {
  const galleries = await db.Galleries.find({ creator: req.user._id })
  if (!galleries) return res.status(404).send({ msg: 'Галереи не найдены' })
  res.send({ msg: 'Галереи найдены', galleries })
}