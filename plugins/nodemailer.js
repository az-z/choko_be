const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp-pulse.com',
  port: 465,
  secure: true,
  auth: {
      user: 'nevvimore@gmail.com',
      pass: 'CsosfbtZPkGjF'
  }
}, {
  from: 'Photoservice <nevvord@sitelife.pp.ua>',
})

const mailer = function (msg, html) {
  transporter.sendMail(msg, (error, info) => {
    if(error) return console.error(error)
    console.log('Email sent: ', info)
  })
}

module.exports = mailer