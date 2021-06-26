/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

module.exports = function configureExpress(app) {
  // cors configuration
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['cookie', 'origin', 'accept'],
    credentials: true,
  }));

  // important security headers
  app.use(helmet());

  // JSON body parser
  app.use(express.json({ limit: '100kb' }));

  // public dir config
  app.use(express.static('src/public'))

  // view engine  config
  app.set('view engine', 'ejs');
  app.set('views', 'src/views');

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.set('trust proxy', 1);
};
