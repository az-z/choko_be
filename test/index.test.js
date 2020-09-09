const { Express } = require('jest-express/lib/express')
const { server } = require('../index')

let app;

describe('Server', () => {
  beforeEach(() => {
    app = new Express()
  })
  afterEach(() => {
    app.resetMocked()
  })
  test('should setup server', () => {
    const options = {
      port: 3012
    }
    server(app, options)
    expect(app.set).toBeCalledWith('port', options.port)
  })
})