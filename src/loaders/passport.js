/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');

module.exports = function passportLoader(app) {
  app.use(passport.initialize({}))
};
