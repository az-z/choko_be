const routes = require('./routes')

express.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html')
})

express.use('/api/auth/', routes.auth)
express.use('/api/gallery', routes.gallery)