/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const AWS = require("aws-sdk");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  write: (tableName, item) => {
    const params = {
      TableName: tableName,
      Item: item,
    };

    return dynamoDbClient.put(params).promise();
  },
};
