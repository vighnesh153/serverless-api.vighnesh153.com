const express = require("express");
const serverless = require("serverless-http");


const loaders = require('./src/loaders');

const app = express();

loaders(app);

module.exports.handler = serverless(app);
