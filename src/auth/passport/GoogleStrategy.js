/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const config = require('../../config');


passport.use(new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.HOST_URL}/auth/google/callback`,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, {
      // some user object
    });
  }
));
