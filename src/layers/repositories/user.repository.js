const { User, Session } = require("../../models");

module.exports = class UserRepository {
  createUser = async (email, nickname, password) => {
    const createUsersData = await User.create({
      email,
      nickname,
      password,
    });

    return createUsersData;
  };

  findUserById = async (userId) => {
    const user = await User.findByPk(userId);

    return user;
  };

  findUserLogin = async (email, password) => {
    const user = await User.findOne({
      where: { email, password },
    });

    return user;
  };

  findUserByMail = async (email) => {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  };

  // findUserByNN = async (nickname) => {
  //   const user = await User.findOne({
  //     where: { nickname },
  //   });

  //   return user;
  // };

  deleteUser = async (userId) => {
    const success = await User.destroy({ where: userId });

    return success;
  };

  createSession = async (userId) => {
    const session = await Session.create({ userId });

    return session;
  };

  findSession = async (sessionId) => {
    const session = await Session.findByPk(sessionId);

    return session;
  };

  deleteSession = async (sessionId) => {
    const success = await Session.destroy({ where: sessionId });

    return success;
  };
};
