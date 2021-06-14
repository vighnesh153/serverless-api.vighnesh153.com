/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');
const AuthService = require('./auth.service');

const config = require('../config');
const { CustomDate } = require('../util');

const domain = config.UTILS.isProduction() ? 'vighnesh153.com' : 'localhost';

const passportGoogleAuth = passport.authenticate('google', {
  scope: [ 'email', 'profile' ],
});

const passportGoogleAuthCallback = passport.authenticate('google', {
  failureRedirect: config.AUTH_CLIENT_URL,
});

async function googleSignupSuccess(req, res, next) {
  try {
    console.log(req.user);
    const session = await AuthService.createSession(req.user);
    console.log(session);

    const expiresAt = new CustomDate()
      .addHours(config.SESSION_EXPIRY_HOURS)
      .toDate();
    console.log(expiresAt);

    const userInfo = {
      name: req.user.name,
      roles: req.user.roles,
      profileImage: req.user.profileImage,
    };
    console.log(userInfo);

    res.cookie('sessionId', session.identifier, {
      httpOnly: true,
      secure: true,
      domain,
      signed: true,
      expires: expiresAt,
    });
    res.cookie('user', JSON.stringify(userInfo), {
      expires: expiresAt,
      domain,
    });
    res.redirect(`${config.AUTH_CLIENT_URL}?loginSuccess`);
  } catch (err) {
    err.isTrusted = true;
    err.statusCode = 500;
    next(err);
  }
}

function verifyLoginSuccess(req, res) {
  res.json({
    message: 'SUCCESS',
  });
}

function catchAllWildcardRouteHandler(req, res) {
  res.json({
    message: '✨ Authentication Portal for *.vighnesh153.com ✨',
  });
}

module.exports = {
  passportGoogleAuth,
  passportGoogleAuthCallback,
  googleSignupSuccess,
  verifyLoginSuccess,
  catchAllWildcardRouteHandler,
};
