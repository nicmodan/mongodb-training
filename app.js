const express = require("express")
const app = express()

// const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./utiles/config');
const logger = require('./utiles/logger');
const studentController = require('./controllers/controllerOne.js');
const studentControllerTwo = require('./controllers/controllerTwo.js');

const middleware = require('./utiles/midddleware')

const cors = require('cors')


// Middleware
app.use(cors())
// app.use(morgan('combined', { stream: logger.stream }));

app.use(middleware.requestLogger)

// Database Connection config.mongodbEirlyUrl
mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});


// Routes
app.use(express.static("build"))
app.use('/api', studentController);
app.use('/api/two', studentControllerTwo);



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app