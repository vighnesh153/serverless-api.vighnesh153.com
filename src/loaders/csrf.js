/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const csrf = require('csurf');

const config = require('../config');

const domain = config.UTILS.isProduction() ? 'vighnesh153.com' : 'localhost';

const sameSite = config.UTILS.isProduction() ? 'lax' : 'none';

module.exports = function configureCSRF(app) {
  app.use(
    csrf({
      cookie: {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite,
      },
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    }),
  );

  app.use((req, res, next) => {
    res.cookie('vighnesh153-XSRF-TOKEN', req.csrfToken(), {
      secure: true,
      domain,
      sameSite,
    });
    next();
  });
};
