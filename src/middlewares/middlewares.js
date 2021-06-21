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
  console.log('Inside ensure Authenticated.');
  console.log('req', req);
  console.log('user', req.user);

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

    const user = await Dynamo.read(config.TABLE_NAMES.USERS, {
      userId: session.userId
    });

    if (!user.Item) {
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

const healthCheck = (req, res) => {
  res.sendStatus(200);
};

const rootWildcardHandler = (req, res) => {
  return res.json({
    message: "✨✨✨👻👻👻 Oops. You are not supposed to be here. GO AWAY!!! or I will hack your computer using HTML 👻👻👻✨✨✨",
  });
};

const middlewares = {
  ensureAuthenticated,
  rootWildcardHandler,
  healthCheck,
};

module.exports = middlewares;
