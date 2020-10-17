const app = require('express')();
const db = require('./db')()
const cors = require('cors')
const  { json, static, Router } = require('express')
require('dotenv').config()

global.db = db
global.router = Router()
global.express = app
global.middleware = require('./middlewares')

app.use(static('uploads'))
app.use(static('static'))
app.use(json())
app.use(cors({
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200
}))

require('./Api')

//==== Listen Requests =====
app.listen(process.env.SERVER_PORT, () => console.log(`Server has been running in ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`))