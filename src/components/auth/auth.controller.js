/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */


require('./passport');

const passport = require('passport');
const config = require('../../config');


const router = require('express').Router();

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
  ));

router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: `${config.AUTH_CLIENT_URL}?loginSuccess`,
    failureRedirect: config.AUTH_CLIENT_URL,
  }));

export default router;
