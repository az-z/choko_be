const mongoose = require('mongoose');
require('dotenv').config()

const link = `${process.env.DB_HOST}${process.env.DB_NAME}`
const settings = { useNewUrlParser: true, useUnifiedTopology: true }
const connection = mongoose.createConnection(link, settings);

connection.on('connected',    ()    => console.log(`Mongoose connection open to ${process.env.DB_NAME} db`));
connection.on('error',        (err) => console.log(`Mongoose connection error to ${process.env.DB_NAME} db: ` + err));
connection.on('disconnected', ()    => console.log(`Mongoose connection disconnected ${process.env.DB_NAME} db`));

module.exports = () => {
  console.log('Returning db...')

  return {
    connection,
    Users: require('./models/Users')(mongoose, connection),
    Galleries: require('./models/Galleries')(mongoose, connection),
    Images: require('./models/Images')(mongoose, connection),
  }
}