/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');
const config = require('../../config');

const middlewares = require('../../middlewares');

const commonData = {config};

const router = require('express').Router();

/**
 * Checks if the redirect domain is valid
 *
 * @param domain {string}
 * @return boolean
 */
const validRedirectDomain = (domain = '') => {
  const commonValidity = domain.includes('/') === false;
  const devValidity = domain.startsWith('localhost');
  const prodValidity = domain.endsWith('vighnesh153.com');

  if (config.UTILS.isProduction() === false) {
    return commonValidity && (devValidity || prodValidity);
  }
  return commonValidity && prodValidity;
};

router.get('/', (req, res) => {
  console.log('Inside /auth');
  console.log('req', req);
  console.log('user', req.user);
  console.log('query', req.query);

  const redirectDomain = req.query['redirect_domain'];
  const redirectPath = req.query['redirect_path'] || '/';
  const secureRedirect = req.query['secure_redirect'] === 'true';

  console.log("redirectDomain", redirectDomain);
  console.log("redirectPath", redirectPath);
  console.log("secureRedirect", secureRedirect);

  if (!req.user) {
    return res.render('loginWithGoogle', { ...commonData, });
  }

  if (!redirectDomain) {
    return res.redirect(config.HOST_URL + '/auth/login-success');
  }

  if (validRedirectDomain(redirectDomain)) {
    return res.redirect(`${secureRedirect ? 'https' : 'http'}://${redirectDomain}${redirectPath}`);
  }
  return res.render('invalidRedirectUrl', { ...commonData, });
});

router.get('/login-success', (req, res) => {
  console.log('Inside /auth/login-success');
  console.log('req', req);
  console.log('user', req.user);
  if (!req.user) {
    return res.redirect(config.HOST_URL + '/auth/login-failed');
  }
  res.render('loginSuccess', { ...commonData, });
});

router.get(
  '/login-failed',
  middlewares.logoutUser(true),
  (req, res) => {
    console.log('Inside /auth/login-failed');
    res.render('loginFailed', { ...commonData, });
  },
);

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
  ));

router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: `/auth/login-success`,
    failureRedirect: `/auth/login-failed`,
  }));

router.get('/user-details', (req, res) => {
  console.log('Inside /auth/user-details');
  console.log('req', req);
  if (!req.user) {
    console.log('unauthenticated')
    return res.sendStatus(401);
  }
  const userData = {
    name: req.user['name'] || '',
    roles: req.user['roles'] || '',
    profileImage: req.user['profileImage'] || '',
    language: req.user['language'] || '',
  };
  console.log('userData', userData);
  return res.json(userData);
});

router.use((req, res) => {
  console.log('404 route triggerred');
  console.log('req', req);
  res.render('404', { ...commonData, })
});

module.exports = router;
