/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

// Importing for jsdoc type support
const express = require('express');
const config = require('../config');

const {clearSessionCookie} = require('../loaders/session');

/**
 * Health check endpoint (just to check if lambda bootstraps correctly on HttpEvent)
 *
 * @param req {express.Request}
 * @param res {express.Response}
 */
const healthCheck = (req, res) => {
  console.log('Health Check Success');
  res.sendStatus(200);
};


/**
 * Root wild card handler
 *
 * @param req {express.Request}
 * @param res {express.Response}
 * @return {void}
 */
const rootWildcardHandler = (req, res) => {
  console.log('Inside Root Wild Card Route handler');
  res.json({
    message: "✨✨✨👻👻👻 Oops. You are not supposed to be here. GO AWAY!!! or I will hack your computer using HTML 👻👻👻✨✨✨",
  });
};


/**
 * User logout handler
 *
 * @param callNextAfter {boolean}
 * @return {function(req: express.Request, res: express.Response, next: express.NextFunction): void}
 */
const logoutUser = (callNextAfter = true) => (req, res, next) => {
  try {
    console.log('Inside logoutUser')
    console.log('destroying express session');

    req['session'].destroy((err) => {
      clearSessionCookie(res);

      if (err) {
        console.log('session.destroy error', err);
        if (callNextAfter) return next();
        return res.status(400).json({title: 'Failed to destroy the session', message: '😭'});
      }

      console.log('express session destroyed');
      if (callNextAfter) return next();
      return res.status(400).json({title: 'User logged out', message: '✨✨✨ Yay! ✨✨✨'});
    })
  } catch (err) {
    console.log('error destroying express session', err);
    if (callNextAfter) return next();
    return res.status(500).json({title: 'Some error occurred', message: err?.message || ''});
  }
};


/**
 *
 * @param err {Error}
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {express.NextFunction}
 * @return {void|*}
 */
const genericErrorHandler = (err, req, res, next) => {
  console.log('Inside genericErrorHandler');
  console.log('error', err);

  // If invalid session, log user out.
  if (`${err.message}`.includes("Couldn't deserialize user with id")) {
    console.log('Logging user out...');
    return logoutUser(false)(req, res, next);
  }

  // For all other errors, return 500
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
