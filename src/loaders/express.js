/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const configureCSRF = require('./csrf');
const configureRoutes = require('./routes');
const config = require('../config');
const middlewares = require('../middlewares');

module.exports = function configureExpress(app) {
  app.use(helmet());

  app.use(express.json({ limit: '10kb' }));

  app.use(cookieParser(config.COOKIE_SECRET));

  configureCSRF(app);

  // health check
  app.use('/health', middlewares.healthCheck);

  // routes
  configureRoutes(app);

  // 404
  app.use(middlewares.rootWildcardHandler);

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
};
