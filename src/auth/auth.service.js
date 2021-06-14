/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const crypto = require('crypto');

const { CustomDate } = require('../util');
const config = require('../config');

const Dynamo = require('../services/Dynamo');

async function createSession(user) {
  return Dynamo.write(config.TABLE_NAMES.SESSIONS, {
    identifier: crypto.randomBytes(50).toString('hex'),
    userId: user.userId,
    roles: user.roles,
    expiresAt: new CustomDate().addHours(config.SESSION_EXPIRY_HOURS).getTimestamp(),
  });
}

module.exports = {
  createSession,
};
