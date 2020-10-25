const routes = require('./routes')

express.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

express.use('/order', routes.order)
express.use('/auth', routes.auth)
express.use('/gallery', routes.gallery)