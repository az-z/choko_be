const routes = require('./Routes')

express.get('/', (req, res) => {
  res.sendFile(__dirname + '/View/index.html')
})

express.use('/auth', routes.auth)
express.use('/gallery', routes.gallery)
express.use('/order', routes.order)