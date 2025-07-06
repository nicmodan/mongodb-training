const app = require('./app') // the actual Express application
const config = require('./utiles/config')
const logger = require('./utiles/logger')

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
})