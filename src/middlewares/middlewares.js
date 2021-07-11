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

const logoutUser = (callNextAfter = true) => (req, res, next) => {
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
        if (callNextAfter) {
          return next();
        }
        return res.status(400).json({
          title: 'Failed to destroy the session',
          message: '😭',
        })
      }
      console.log('destroyed express session');
      if (callNextAfter) {
        return next();
      }
      return res.status(400).json({
        title: 'User logged out..',
        message: 'Khatam',
      })
    })
  } catch (err) {
    console.log('error destroying express session', err);
    if (callNextAfter) {
      return next();
    }
    return res.status(500).json({
      title: 'Some error occurred',
      message: err?.message || '',
    })
  }
};

const genericErrorHandler = (err, req, res, next) => {
  console.log('Inside genericErrorHandler');
  console.log('error', err);

  if (`${err.message}`.includes("Couldn't deserialize user with id")) {
    console.log('Logging user out...');
    return logoutUser(false)(req, res, next);
  }

  return res.status(500).json({
    title: 'Some error occurred',
    message: err?.message || '',
  })
};

const middlewares = {
  healthCheck,
  genericErrorHandler,
  rootWildcardHandler,
  logoutUser,
};

module.exports = middlewares;
