/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const authRoutes = require('../components/auth/auth.controller');

const middlewares = require('../middlewares');

module.exports = function routesLoader(app) {
  // health check
  app.use('/health', middlewares.healthCheck);

  app.use('/auth', authRoutes);

  // 404
  app.use(middlewares.rootWildcardHandler);
};
