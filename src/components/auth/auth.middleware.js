/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */


// Importing for jsdoc type support
const express = require('express');

const config = require('../../config');

const commonData = {config};

/**
 * Checks if the redirect domain is valid
 *
 * @param domain {string}
 * @return boolean
 */
const validRedirectDomain = (domain = '') => {
  const commonValidity = domain.includes('/') === false;
  const devValidity = domain.startsWith('localhost');
  const prodValidity = domain.endsWith(config.ROOT_DOMAIN);

  if (config.UTILS.isProduction() === false) {
    return commonValidity && (devValidity || prodValidity);
  }
  return commonValidity && prodValidity;
};


/**
 * Renders the home page of the auth portal, if not authenticated, else redirects.
 * If redirect domain exists and is valid, then redirect happens to that url (protocol + domain + path),
 * else, redirect happens to the login-success page.
 *
 * @param req {express.Request}
 * @param res {express.Response}
 * @return {void}
 */
exports.homePage = (req, res) => {
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

  // If not authenticated, render the loginWithGoogle view
  if (!req.user) {
    return res.render('loginWithGoogle', { ...commonData, });
  }

  // If redirect domain is not provided, redirect to login-success
  if (!redirectDomain) {
    return res.redirect(config.HOST_URL + '/auth/login-success');
  }

  // If redirect domain is provided and is valid, then redirect to that url
  if (validRedirectDomain(redirectDomain)) {
    return res.redirect(`${secureRedirect ? 'https' : 'http'}://${redirectDomain}${redirectPath}`);
  }

  // If redirect domain is invalid, render the invalidRedirectUrl view
  return res.render('invalidRedirectUrl', { ...commonData, });
};


/**
 * Renders the login-success page of the auth portal,
 * if authenticated, else redirects to login-failed page.
 *
 * @param req {express.Request}
 * @param res {express.Response}
 * @return {void}
 */
exports.loginSuccess = (req, res) => {
  console.log('Inside /auth/login-success');
  console.log('req', req);
  console.log('user', req.user);

  // If user is not authenticated, then redirect to login-failed route
  if (!req.user) {
    return res.redirect(config.HOST_URL + '/auth/login-failed');
  }

  // If user is authenticated, render the loginSuccess page
  res.render('loginSuccess', { ...commonData, });
};


/**
 * Renders the login-failed page of the auth portal.
 *
 * @param req {express.Request}
 * @param res {express.Response}
 * @return {void}
 */
exports.loginFailed = (req, res) => {
  console.log('Inside /auth/login-failed');
  res.render('loginFailed', { ...commonData, });
};


/**
 * Fetches the basic user details of the authenticated user
 *
 * @param req {express.Request}
 * @param res {express.Response}
 * @return {any}
 */
exports.getUserDetails = (req, res) => {
  console.log('Inside /auth/user-details');
  console.log('req', req);

  // If user is not authenticated, throw 401
  if (!req.user) {
    console.log('unauthenticated')
    return res.sendStatus(401);
  }

  // If user is authenticated, return the user info
  const userData = {
    name: req.user['name'] || '',
    roles: req.user['roles'] || '',
    profileImage: req.user['profileImage'] || '',
    language: req.user['language'] || '',
  };
  console.log('userData', userData);
  return res.json(userData);
};


/**
 * Wild card handler for auth routes
 *
 * @param req {express.Request}
 * @param res {express.Response}
 * @return {void}
 */
exports.genericNotFound = (req, res) => {
  console.log('404 route triggerred');
  console.log('req', req);
  res.render('404', { ...commonData, })
};
