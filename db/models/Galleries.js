module.exports = (mongoose, conn) =>
  conn.model('Galleries', new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    title: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Images'
    }],
    payment: String,
    description: String,
    folder: String,
    price: Number,
    activity: Boolean,
    date: {
      type: Date,
      default: Date.now
    }
  }))