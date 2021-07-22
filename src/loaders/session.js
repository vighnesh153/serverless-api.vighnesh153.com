/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const express = require('express');
const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')(session);

const config = require('../config');

exports.sessionLoader = (app) => {
  const dynamoDBStoreOptions = {
    table: config.TABLE_NAMES.SESSIONS,
    hashKey: config.SESSION.HASH_KEY,
  };

  const sessionOptions = {
    name: config.SESSION.COOKIE_NAME,
    secret: config.COOKIE.SECRET,
    cookie: {
      secure: config.COOKIE.SECURE,
      maxAge: config.SESSION.DURATION,
      domain: config.COOKIE.DOMAIN,
      sameSite: config.COOKIE.SAME_SITE,
    },
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: new DynamoDBStore(dynamoDBStoreOptions),
  };

  app.use(session(sessionOptions));
};

/**
 * Clears session cookie
 * @param res {express.Response}
 */
exports.clearSessionCookie = (res) => {
  res.clearCookie(config.SESSION.COOKIE_NAME, {
    secure: config.COOKIE.SECURE,
    domain: config.COOKIE.DOMAIN,
    sameSite: config.COOKIE.SAME_SITE,
  });
};
