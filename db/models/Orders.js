module.exports = (mongoose, connection) =>
  connection.model('Orders', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    galery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Galleries'
    },
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Images'
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: Boolean,
      default: false
    }
  }))