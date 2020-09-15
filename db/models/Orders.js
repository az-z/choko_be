module.exports = (mongoose, connection) =>
connection.model('Images', new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  galery: { type: mongoose.Schema.Types.ObjectId, ref: 'Galleries' },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Imasges' }],
  date: {type: Date, default: Date.now}
}))