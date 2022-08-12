const key = require("../../config/secretKey");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = (req, res, next) => {
  const authorization = req.headers.cookie;
  next();
};
