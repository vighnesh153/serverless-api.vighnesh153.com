/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const cookieParser = require('cookie-parser');
const config = require('../config');

module.exports = function cookiesLoader(app) {
  app.use(cookieParser(config.COOKIE.SECRET));
};
