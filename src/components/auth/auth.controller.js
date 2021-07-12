/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');
const router = require('express').Router();

const middlewares = require('../../middlewares');
const authMiddlewares = require('./auth.middleware');


router.get('/', authMiddlewares.homePage);

router.get('/login-success', authMiddlewares.loginSuccess);

router.get('/login-failed', middlewares.logoutUser(true), authMiddlewares.loginFailed);

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
  ));

router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: `/auth/login-success`,
    failureRedirect: `/auth/login-failed`,
  }));

router.get('/user-details', authMiddlewares.getUserDetails);

router.use(authMiddlewares.genericNotFound);

module.exports = router;
