const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASSWORD
  }
}, {
  from: 'Photoservice <info@keytophoto.com>',
})

const mailer = function (msg, html) {
  transporter.sendMail(msg, (error, info) => {
    if(error) return console.error(error)
    console.log('Email sent: ', info)
  })
}

module.exports = mailer