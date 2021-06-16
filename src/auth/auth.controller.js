/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const router = require('express').Router();

require('./passport');

const authMiddlewares = require('./auth.middlewares');
const middlewares = require('../middlewares');

router.get('/google', authMiddlewares.passportGoogleAuth);

router.get(
  '/google/callback',
  authMiddlewares.passportGoogleAuthCallback,
  authMiddlewares.googleSignupSuccess,
);

router.get(
  '/verify',
  middlewares.ensureAuthenticated,
  authMiddlewares.verifyLoginSuccess,
);

router.use(authMiddlewares.catchAllWildcardRouteHandler);

module.exports = router;
