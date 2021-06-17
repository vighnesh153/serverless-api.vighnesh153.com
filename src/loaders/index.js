/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passportLoader = require('./passport');
const expressLoader = require('./express');

module.exports = function loaders(app) {
  passportLoader(app);
  expressLoader(app);
};
