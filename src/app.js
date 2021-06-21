/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const express = require("express");

const loaders = require('./loaders');

const app = express();

loaders(app);

module.exports = app;
