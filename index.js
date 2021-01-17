const app = require('express')();
const db = require('./db')()
const cors = require('cors')
const bodyParser = require('body-parser')
// const serveStatic = require('serve-static')
const  { static, Router } = require('express')
//const mailer = require('./plugins/nodemailer')
const mailer = require('./plugins/mailjet')
const timeout = require('connect-timeout')
require('dotenv').config()
const fs = require('fs')

const uploadsDir = 'uploads'

global.db = db
global.router = Router()
global.express = app
global.middleware = require('./middlewares')
global.mailer = mailer

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)
// const allowedOrigins = ['http://localhost:3000', process.env.SITE];


app.use(cors())
app.options(cors()) 
app.use(timeout('30s'))
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(static(uploadsDir))
app.use(static('static'))
// app.use(cors({  
//   origin: function(origin, callback){
//     // allow requests with no origin     
//     // (like mobile apps or curl requests)    
//     if(!origin) 
//       return callback(null, true);    
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +                
//           'allow access from the specified Origin.';
//       return callback(new Error(msg), false);    
//     }    
//     return callback(null, true);  
//   }
// }));




require('./api')
require('./timers')

//==== Listen Requests =====
app.listen(process.env.SERVER_PORT, () => console.log(`Server has been running in ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`))
