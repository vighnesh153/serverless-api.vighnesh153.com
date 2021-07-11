/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const config = require('../../config');
const Dynamo = require('../../services/Dynamo');

function isAdminProfile(profile) {
  return config.GOOGLE_ADMIN_EMAILS.includes(profile.email);
}

function formatGoogleProfile(profile) {
  const roles = ['user'];
  const newUser = {
    name: profile.displayName || profile.given_name || 'User',
    userId: profile.id,
    profileImage: profile.picture,
    roles: roles.join(','),
    provider: profile.provider,
    email: profile.email,
    language: profile.language || 'en',
  };
  if (isAdminProfile(profile)) {
    roles.push('admin');
  }
  newUser.roles = roles.join(',');
  return newUser;
}

passport.use(new GoogleStrategy({
    clientID:     config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.HOST_URL}/auth/google/callback`,
    passReqToCallback   : true,
    scope: ['email', 'profile'],
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      console.log('Inside afterGoogleLoginCB');
      console.log('profile', profile);
      const userObj = await Dynamo.read(config.TABLE_NAMES.USERS, {
        userId: profile.id,
      });
      if (userObj.Item) {
        done(null, userObj.Item);
        return;
      }
      const newUser = formatGoogleProfile(profile);
      console.log('New User Registration:', newUser);
      await Dynamo.write(config.TABLE_NAMES.USERS, newUser);
      done(null, newUser);
    } catch (err) {
      console.log('passport googleSignupSuccess [CATCH]', err);
      done(err, null);
    }
  }
));
