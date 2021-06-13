/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');

require('./GoogleStrategy');

module.exports = (app) => {
  app.use(passport.initialize({}));
};
