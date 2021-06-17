/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const csrf = require('csurf');

const config = require('../config');

const domain = config.UTILS.isProduction() ? 'vighnesh153.com' : 'localhost';

module.exports = function configureCSRF(app) {
  app.use(
    csrf({
      cookie: {
        httpOnly: true,
        secure: config.UTILS.isProduction(),
        signed: true,
      },
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    }),
  );

  app.use((req, res, next) => {
    res.cookie('vighnesh153-XSRF-TOKEN', req.csrfToken(), {
      secure: config.UTILS.isProduction(),
      domain,
    });
    next();
  });
};
