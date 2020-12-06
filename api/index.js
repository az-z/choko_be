const routes = require('./routes')

express.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

express.use('/user', routes.user)
express.use('/order', routes.order)
express.use('/auth', routes.auth)
express.use('/gallery', routes.gallery)
express.use('/admin', routes.admin)