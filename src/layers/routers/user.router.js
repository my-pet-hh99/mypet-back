const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

// http://localhost:8080/api/user

module.exports = router;
