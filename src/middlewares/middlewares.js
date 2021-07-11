/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const config = require('../config');

const healthCheck = (req, res) => {
  console.log('Health Check Success');
  res.sendStatus(200);
};

const rootWildcardHandler = (req, res) => {
  console.log('Inside Root Wild Card Route handler');
  return res.json({
    message: "✨✨✨👻👻👻 Oops. You are not supposed to be here. GO AWAY!!! or I will hack your computer using HTML 👻👻👻✨✨✨",
  });
};

const genericErrorHandler = (err, req, res, next) => {
  console.log('Inside genericErrorHandler');
  console.log('error', err);

  try {
    console.log('destroying express session');
    req.session.destroy((err) => {
      res.clearCookie(config.SESSION.COOKIE_NAME, {
        secure: config.COOKIE.SECURE,
        domain: config.COOKIE.DOMAIN,
        sameSite: config.COOKIE.SAME_SITE,
      });
      if (err) {
        console.log('sessionDestroy error', err);
        return res.status(400).json({
          title: 'Failed to destroy the session',
          message: '😭',
        })
      } else {
        console.log('destroyed express session');
        return res.status(400).json({
          title: 'User logged out..',
          message: 'Khatam',
        })
      }
    })
  } catch (err) {
    console.log('failed to destroy express session');
    console.log(err);
    return res.status(500).json({
      title: 'Some error occurred',
      message: err?.message || '',
    })
  }
};

const middlewares = {
  healthCheck,
  genericErrorHandler,
  rootWildcardHandler,
};

module.exports = middlewares;
