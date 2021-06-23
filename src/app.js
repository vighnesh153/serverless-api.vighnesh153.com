/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const express = require("express");
const app = express();

require('./loaders')(app);

module.exports = app;
