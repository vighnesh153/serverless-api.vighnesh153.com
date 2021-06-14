/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const config = require('../config');
const Dynamo = require('../services/Dynamo');

const clearCookies = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('user');
};

const ensureAuthenticated = async (req, res, next) => {
  const { sessionId } = req.signedCookies;
  if (!sessionId) {
    clearCookies(res);
    return res.json({
      status: 401,
      message: 'You are not logged in.',
    });
  }

  try {
    const session = await Dynamo.read(config.TABLE_NAMES.SESSIONS, {
      identifier: sessionId,
    });

    if (session === null) {
      // Invalid session ID
      clearCookies(res);
      return res.json({
        status: 400,
        message: 'Nope. Bad Request.',
      });
    }

    const sessionExpiryDate = new Date(session.expiresAt);
    if (sessionExpiryDate < new Date()) {
      clearCookies(res);
      return res.json({
        status: 401,
        message: 'Your session has expired.',
      });
    }

    // const User = mongoose.model('User');
    // const user = await User.findOne({
    //   _id: session.userId,
    // }).exec();
    const user = null;

    if (user === null) {
      // Not sure if this will ever happen
      // because Session will never be created
      // with an invalid user_id
      return res.json({
        status: 400,
        message: 'No user found.',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    err.isTrusted = true;
    err.statusCode = 500;
    next(err);
  }
};

const middlewares = {
  ensureAuthenticated,
};

module.exports = middlewares;
