const app = require('express')();
const db = require('./db')()
const cors = require('cors')
const  { json, static, Router } = require('express')
const mailer = require('./plugins/nodemailer')
const timeout = require('connect-timeout')
require('dotenv').config()

global.db = db
global.router = Router()
global.express = app
global.middleware = require('./middlewares')
global.mailer = mailer

app.use(static('uploads'))
app.use(static('static'))
app.use(json())
app.use(cors())
app.options('*', cors())
app.use(timeout('60s'))

require('./api')

//==== Listen Requests =====
app.listen(process.env.SERVER_PORT, () => console.log(`Server has been running in ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`))