/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const config = require('../config');

module.exports = function configureExpress(app) {
  // cors configuration
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['cookie', 'origin', 'accept'],
    credentials: true,
  }));

  // important security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: config.CONTENT_SECURITY_POLICY.DEFAULT_SRC,
        scriptSrc: ["'unsafe-inline'", "'unsafe-eval'", "'self'", ...config.CONTENT_SECURITY_POLICY.SCRIPTS_SRC],
        imgSrc: ["'unsafe-inline'", "data:", "blob:", "'self'", ...config.CONTENT_SECURITY_POLICY.IMAGE_SRC],
        styleSrc: ["'unsafe-inline'", "'self'", ...config.CONTENT_SECURITY_POLICY.STYLES_SRC],
      },
    },
  }));

  // JSON body parser
  app.use(express.json({ limit: '100kb' }));

  // view engine  config
  app.set('view engine', 'ejs');
  app.set('views', 'src/views');

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.set('trust proxy', 1);
};
