/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const authRoutes = require('../components/auth/auth.controller');
const adminRoutes = require('../components/admin/admin.controller');

const middlewares = require('../middlewares');

module.exports = function routesLoader(app) {
  // health check
  app.use('/health', middlewares.healthCheck);

  // routes config
  app.use('/auth', authRoutes);
  app.use('/admin', adminRoutes);

  app.use(middlewares.genericErrorHandler);

  // 404
  app.use(middlewares.rootWildcardHandler);
};
