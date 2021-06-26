/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');
const config = require('../../config');

const commonData = {config};

const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('Inside /auth');
  console.log('req', req);
  console.log('user', req.user);
  res.render('loginWithGoogle', { ...commonData, });
});

router.get('/login-success', (req, res) => {
  console.log('Inside /auth/login-success');
  console.log('req', req);
  console.log('user', req.user);
  res.render('loginSuccess', { ...commonData, });
});

router.get('/login-failed', (req, res) => {
  console.log('Inside /auth/login-failed');
  res.render('loginFailed', { ...commonData, });
});

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
  ));

router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: `/auth/login-success`,
    failureRedirect: `/auth/login-failed`,
  }));

router.use((req, res) => {
  console.log('404 route triggerred');
  console.log('req', req);
  res.render('404', { ...commonData, })
});

module.exports = router;
