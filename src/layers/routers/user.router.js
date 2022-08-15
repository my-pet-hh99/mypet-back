const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

// http://localhost:8080/api/user

router.post("/login", userController.login);
router.post("/token", userController);

module.exports = router;
