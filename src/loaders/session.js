/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')(session);

const config = require('../config');

module.exports = (app) => {
  const dynamoDBStoreOptions = {
    table: config.TABLE_NAMES.SESSIONS,
    hashKey: config.SESSION.HASH_KEY,
  };

  const sessionOptions = {
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
