const UserService = require("../services/user.service");

module.exports = class UserController {
  userService = new UserService();
};
