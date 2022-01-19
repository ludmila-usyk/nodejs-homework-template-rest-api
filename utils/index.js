const { HttpCode } = require("./httpCode");
const { MESSAGES } = require("./messages");
const { MIN_AGE, MAX_AGE } = require("./contacts-const");
const Role = require("./role");
const VARIABLES_ENV = require("./variablesEnv");

module.exports = { MIN_AGE, MAX_AGE, HttpCode, MESSAGES, Role, VARIABLES_ENV };