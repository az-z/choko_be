const app = require('express')();
const db = require('./db')()
const cors = require('cors')
const bodyParser = require('body-parser')
const  { static, Router } = require('express')
//const mailer = require('./plugins/nodemailer')
const mailer = require('./plugins/mailjet')
// const timeout = require('connect-timeout')
require('dotenv').config()
const fs = require('fs')

const uploadsDir = './uploads'

global.db = db
global.router = Router()
global.express = app
global.middleware = require('./middlewares')
global.mailer = mailer

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

app
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
  .use(static(uploadsDir))
  .use(static('static'))
  .use(cors())

require('./api')
require('./timers')

//==== Listen Requests =====
app.listen(process.env.SERVER_PORT, () => console.log(`Server has been running in ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`))
