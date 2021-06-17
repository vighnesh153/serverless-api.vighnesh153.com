/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const authRoutes = require('../auth/auth.controller');

module.exports = function routesLoader(app) {
  app.use('/auth', authRoutes);
};
