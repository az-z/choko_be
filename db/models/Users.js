module.exports = (mongoose, conn) =>
  conn.model('Users', new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    email: String,
    password: String,
    googleID: String,
    access_token: String,
    picture: String,
    locale: String,
    verified_email: Boolean,
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Images'}],
    galleries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Galleries' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
    date: { type: Date, default: Date.now },
    site: String,
    facebook: String,
    description: String,
    phoneNumber: String,
    active: new mongoose.Schema({
      status: { type: Boolean, default: false },
      to: { type: Date, default: Date.now }
    }),
    mode: { type: Number, default: 0 }, // 0: USER, 1: ADMIN
    accesses: Array
  }))