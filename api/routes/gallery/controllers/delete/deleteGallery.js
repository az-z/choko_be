const { unlink, rmdir } = require('fs')
module.exports = async (req, res) => {
  try {
    const gallery = await db.Galleries.findOne({ _id: req.params.id, creator: req.user._id }).populate(['images'])
    if (gallery.images) {
      await gallery.images.forEach(async element => {
        unlink(`uploads/${req.user._id}/${req.params.id}/${element.name}`, error => console.error(error))
        unlink(`uploads/${req.user._id}/${req.params.id}/small_${element.name}`, error => console.error(error))
        unlink(`uploads/${req.user._id}/${req.params.id}/xs_${element.name}`, error => console.error(error))
        req.user.images = await req.user.images.filter(elem => String(elem) != String(element._id))
        req.user.galleries = await req.user.galleries.filter(element => element != req.params.id)
        req.user.storage.usage = req.user.storage.usage - element.size
        await element.remove()
      })
      rmdir(`uploads/${req.user._id}/${req.params.id}`, error => console.error(error))
    } 
    await gallery.remove()
    if (req.user.storage.usage >= req.user.storage.limit) req.user.storage.full = true
    else req.user.storage.full = false
    await req.user.save()
    res.send({ msg: 'Галерея удалена успшно' })
  } catch (error) {
    res.status(500).send({ msg: 'Неудалось удалить галерею' })
    console.error(error)
  }
}