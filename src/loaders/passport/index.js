/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const passport = require('passport');

const config = require('../../config');
const Dynamo = require('../../services/Dynamo');

const {Audit} = require('../../util');


// Configure strategies
require('./GoogleStrategy');



passport.serializeUser((user, done) => {
  console.log('Inside passport.serializeUser');
  console.log('user:', user);
  done(null, user['userId']);
});

passport.deserializeUser(async (userId, done) => {
  console.log('Inside passport.deserializeUser');
  console.log('userId:', userId);
  try {
    const userObj = await Dynamo.read(config.TABLE_NAMES.USERS, {userId})

    if (!userObj.Item) {
      const err = new Error(`Couldn't deserialize user with id: "${userId}"`);
      done(err, null);
      return;
    }

    const user = userObj.Item;
    console.log('user:', user);

    done(null, user);
    await Audit.userLogin(user);

  } catch (err) {
    console.log('passport.deserializeUser [CATCH]:', err)
    done(err, null);
  }
});

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
