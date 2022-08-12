const UserRepository = require("../repositories/user.repository");

module.exports = class UserService {
  userRepository = new UserRepository();
};
