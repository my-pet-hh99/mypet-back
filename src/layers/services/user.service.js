const UserRepository = require("../repositories/user.repository");

class UserService {
  usersRepository = new UsersRepository();

  createUsers = async (email, nickname, password) => {
    const userCreateData = await this.usersRepository.createUsers(
      email,
      nickname,
      password
    );

    return userCreateData;
  };
}

module.exports = class UserService {
  userRepository = new UserRepository();
};
