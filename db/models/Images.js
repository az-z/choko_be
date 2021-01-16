module.exports = (mongoose, connection) =>
  connection.model('Images', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    originalName: String,
    path: String,
    size: Number,
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    gallery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Galleries'
    },
    path: {
      original: String,
      small: String,
      xs: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }))