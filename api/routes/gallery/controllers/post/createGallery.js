const axios = require('axios')
const { Types } = require('mongoose')
module.exports = async ( req, res ) => {
  // console.log(req.body)
  // if (!req.body.folder) return ''
  const { title, description, folder, price, activity } = req.body
  // return res.send(folder)
  const folderId = folder ? folder.split('/').pop() : ''
  // const url = `https://content.googleapis.com/drive/v3/files?key=${folderId}`
  // const headers = { Authorization: `Bearer ${req.user.access_token}`}
  // axios.get(url, {headers}).then(response => {
  //   res.send({ response })
  // }).catch(error => {
  //   res.status(500).send({ error })
  // })
  const gallery = await new db.Galleries({
    _id: Types.ObjectId(),
    title,
    creator: req.user._id,
    description,
    price,
    activity
  }) 
  req.user.galleries.push(gallery._id)
  req.user.save()
  gallery.save().then(response => {
    res.send({ msg: 'Галерея создана успешно', gallery: response })
  }).catch(error => {
    res.status(500).send({ msg: 'Ошибка при сохранении галереи', error })
  })
}