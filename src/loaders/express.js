/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const configureCSRF = require('./csrf');
const configureRoutes = require('./routes');
const config = require('../config');
const middlewares = require('../middlewares');

const authRoutes = require('../components/auth/auth.controller');

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

  app.use(express.json({ limit: '100kb' }));

  app.use(cookieParser(config.COOKIE_SECRET));

  // configureCSRF(app);

  // health check
  app.use('/health', middlewares.healthCheck);

  // view engine  config
  app.set('view engine', 'ejs');
  app.set('views', 'public')

  // routes
  // configureRoutes(app);
  app.use('/auth', authRoutes);

  // 404
  app.use(middlewares.rootWildcardHandler);

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
};
