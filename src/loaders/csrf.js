/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const csrf = require('csurf');
const config = require('../config');

module.exports = function csrfLoader(app) {
  app.use(
    csrf({
      cookie: {
        httpOnly: true,
        domain: config.COOKIE.DOMAIN,
        secure: config.COOKIE.SECURE,
        signed: true,
        sameSite: config.COOKIE.SAME_SITE,
      },
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    }),
  );

  app.use((req, res, next) => {
    res.cookie(config.COOKIE.XSRF_COOKIE_NAME, req.csrfToken(), {
      secure: config.COOKIE.SECURE,
      httpOnly: false,
      domain: config.COOKIE.DOMAIN,
      sameSite: config.COOKIE.SAME_SITE,
    });
    next();
  });
};
