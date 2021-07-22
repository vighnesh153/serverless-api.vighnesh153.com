/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const cookiesLoader = require('./cookies');
const {sessionLoader} = require('./session');
const csrfLoader = require('./csrf');
const passportLoader = require('./passport');
const expressLoader = require('./express');
const routesLoader = require('./routes');

module.exports = function loaders(app) {
  cookiesLoader(app);
  sessionLoader(app);
  csrfLoader(app);
  passportLoader(app);
  expressLoader(app);
  routesLoader(app);
};
