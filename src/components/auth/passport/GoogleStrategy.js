/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const config = require('../../../config');
const Dynamo = require('../../../services/Dynamo');

function isAdminProfile(profile) {
  return config.GOOGLE_ADMIN_EMAILS.includes(profile.email);
}

function formatGoogleProfile(profile) {
  const roles = ['user'];
  const newUser = {
    name: profile.displayName || profile.given_name || 'User',
    userId: profile.id,
    profileImage: profile.picture,
    roles: '',
    provider: 'google',
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
      const userObj = await Dynamo.read(config.TABLE_NAMES.USERS, {
        userId: profile.id,
      });
      if (userObj.Item) {
        done(null, userObj.Item);
        return;
      }
      const newUser = formatGoogleProfile(profile);
      await Dynamo.write(config.TABLE_NAMES.USERS, newUser);
      done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  }
));
