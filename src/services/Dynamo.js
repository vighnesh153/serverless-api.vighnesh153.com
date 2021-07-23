/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const AWS = require("aws-sdk");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

dynamoDbClient.batchGet({

})

module.exports = {
  /**
   * @param tableName
   * @param key
   * @return {Promise}
   */
  read: (tableName, key) => {
    const params = {
      TableName: tableName,
      Key: key,
    };

    return dynamoDbClient.get(params).promise();
  },

  /**
   * @param {string} tableName
   * @param {Object} restParams
   * @return {Promise}
   */
  scanRead: (tableName, restParams) => {
    const params = {
      TableName: tableName,
      ...restParams,
    };

    return dynamoDbClient.scan(params).promise();
  },

  /**
   * @param tableName
   * @param item
   * @return {Promise}
   */
  write: (tableName, item) => {
    const params = {
      TableName: tableName,
      Item: item,
    };

    return dynamoDbClient.put(params).promise();
  },
};
