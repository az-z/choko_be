module.exports = (mongoose, conn) =>
  conn.model('Payments', new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    status: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  }))