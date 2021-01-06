const { unlink } = require('fs')
module.exports = async (req, res) => {
  const user = req.user
  try {
    const gallery = await db.Galleries.findOne({ _id: req.params.id, creator: user._id })
      .populate(['images'])
    if (gallery.images) gallery.images.forEach(async element => {
      unlink(`uploads/${element.name}`, error => console.error(error))
      unlink(`uploads/small_${element.name}`, error => console.error(error))
      user.images = user.images.filter(elem => {
        if (String(elem) != String(element._id)) return elem
      })
      user.galleries = user.galleries.filter(element => element != req.params.id)
      user.storage.usage = user.storage.usage - element.size
      await element.remove()
    })
    await gallery.remove()
    if (user.storage.usage >= user.storage.limit) user.storage.full = true
    else user.storage.full = false
    await user.save()
    res.send({ msg: 'Галерея удалена успшно' })
  } catch (error) {
    res.status(500).send({ msg: 'Неудалось удалить галерею' })
    console.error(error)
  }
}