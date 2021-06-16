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
  const newUser = {
    name: profile.displayName || profile.given_name || 'User',
    userId: profile.id,
    profileImage: profile.picture,
    roles: ['user'],
    provider: 'google',
    language: profile.language || 'en',
  };
  if (isAdminProfile(profile)) {
    newUser.roles.push('admin');
  }
  return newUser;
}

passport.use(
  'google',
  new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.HOST_URL}/auth/google/callback`,
    passReqToCallback: true,
    scope: ['email', 'profile']
  },
  async (request, accessToken, refreshToken, profile, done) => {
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

passport.serializeUser((user, done) => {
  done(null, user['userId']);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const userObj = await Dynamo.read(config.TABLE_NAMES.USERS, {userId})
    if (userObj.Item) {
      done(null, userObj.Item);
    } else {
      const err = new Error(`Couldn't deserialize user with id: "${userId}"`);
      done(err, null);
    }
  } catch (err) {
    done(err, null);
  }
});
