const { User } = require("../../models");
class UserRepository {
  createUsers = async (email, nickname, password) => {
    const createUsersData = await Users.create({
      email,
      nickname,
      password,
    });

    return createUsersData;
  };
}

module.exports = class UserRepository {};
