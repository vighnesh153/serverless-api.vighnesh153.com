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
    passReqToCallback: true,
    scope: ['email', 'profile']
  },
  (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);

    // create the user in the DB and return that below

    return done(null, {
      // some user object
    });
  }
));

// passport.serializeUser((user, done) => {
//   done(null, user.githubId);
// });
//
// passport.deserializeUser(async (githubId, done) => {
//   try {
//     const filters = { githubId };
//     const user = await User.findOne(filters).exec();
//     done(null, user);
//   } catch (err) {
//     err.isTrusted = true;
//     err.statusCode = 500;
//     done(err, null);
//   }
// });
