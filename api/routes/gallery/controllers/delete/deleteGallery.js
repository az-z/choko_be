const { unlink } = require('fs')
module.exports = async (req, res) => {
  const user = req.user
  try {
    const gallery = await db.Galleries.findOne({ _id: req.params.id, creator: user._id })
      .populate(['images'])
    if (gallery.images) gallery.images.forEach(async element => {
      unlink(`uploads/${element.name}`, error => console.error(error))
      unlink(`uploads/small_${element.name}`, error => console.error(error))
      // console.log(user.images, element._id);
      user.images = user.images.filter(elem => {
        // console.log(elem, element._id, elem != element._id, typeof(elem), typeof(element._id))
        if (String(elem) != String(element._id)) return elem
      })
      // console.log(user.images)
      const imageRem = await element.remove()
    })
    const removeGallery = await gallery.remove()
    user.galleries = user.galleries.filter(element => element != req.params.id)
    const userSave = await user.save()
    res.send({ msg: 'Галерея удалена успшно' })
  } catch (error) {
    res.status(500).send({ msg: 'Неудалось удалить галерею' })
    console.error(error)
  }
}