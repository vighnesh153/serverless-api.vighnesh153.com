/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const {v4: uuid} = require('uuid');

const config = require('../config');
const Dynamo = require('../services/Dynamo');

class Audit {
  static #resources = {
    AUTH: 'AUTH',
  };

  static #actionsTypes = {
    USER_SIGNUP: 'USER_SIGNUP',
    USER_LOGIN: 'USER_LOGIN',
  };

  /**
   *
   * @param auditObj {{
   *    resource: {
   *      key: string,
   *      public: boolean,
   *    },
   *    action: {
   *      type: string,
   *      payload: any,
   *    },
   *    userName: string,
   *    user: {
   *      email: string,
   *      profileImage: string,
   *      userId: string,
   *      createdAt: string
   *      name: string,
   *      roles: string,
   *      banned: boolean,
   *    },
   * }}
   * @return Promise
   */
  static #add = (auditObj) => {
    const date = new Date();
    return Dynamo.write(config.TABLE_NAMES.AUDITS, {
      auditId: uuid(),
      timestamp: date.toUTCString(),
      timestampForSorting: date.getTime(),
      userName: auditObj.userName,
      resource: JSON.stringify(auditObj.resource),
      payload: JSON.stringify(auditObj.action.payload),
      action: auditObj.action.type,
      user: JSON.stringify(auditObj.user),
    });
  };

  /**
   * @param user {{
   *    email: string,
   *    profileImage: string,
   *    userId: string,
   *    createdAt: string,
   *    name: string,
   *    roles: string,
   *    banned: boolean,
   *  }}
   * @return Promise
   */
  static userLogin = (user) => {
    return Audit.#add({
      resource: {
        key: Audit.#resources.AUTH,
        public: false,
      },
      userName: user.name,
      user,
      action: {
        payload: {},
        type: Audit.#actionsTypes.USER_LOGIN,
      },
    });
  };

  /**
   * @param user {{
   *    email: string,
   *    profileImage: string,
   *    userId: string,
   *    createdAt: string
   *    name: string,
   *    roles: string,
   *    banned: boolean,
   *  }}
   * @return Promise
   */
  static userSignup = (user) => {
    return Audit.#add({
      resource: {
        key: Audit.#resources.AUTH,
        public: false,
      },
      userName: user.name,
      user,
      action: {
        payload: {},
        type: Audit.#actionsTypes.USER_SIGNUP,
      },
    });
  };
}

module.exports = Audit;
