/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');

const config = require('../../../config');
const Dynamo = require('../../../services/Dynamo');



require('./GoogleStrategy');



passport.serializeUser((user, done) => {
  console.log('Serialize user', user);
  done(null, user['userId']);
});

passport.deserializeUser(async (userId, done) => {
  console.log('Inside deserialize user')
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
