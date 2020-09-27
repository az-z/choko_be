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
    galleries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Galleries' }],
    date: { type: Date, default: Date.now },
    site: String,
    facebook: String,
    description: String,
    phoneNumber: String
  }))