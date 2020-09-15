module.exports = (mongoose, conn) =>
  conn.model('Users', new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    email: String,
    googleID: String,
    access_token: String,
    picture: String,
    locale: String,
    verified_email: Boolean,
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Images'}],
    date: { type: Date, default: Date.now }
  }))