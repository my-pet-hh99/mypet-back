const { User, Session } = require("../../models");


module.exports = class UserRepository {
  createUser = async (email, nickname, password, answer) => {
    const createUsersData = await User.create({
      email,
      nickname,
      password,
      answer,
    });

    return createUsersData;
  };

  findUserById = async (userId) => {
    const user = await User.findByPk(userId);

    return user;
  };

  findUserbyEmail = async (email) => {
    const user = await User.findOne({
      where: { email },
    });
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

  createSession = async (userId, token) => {
    const session = await Session.create({ userId, token });

    return session;
  };

  findSession = async (userId, token) => {
    const session = await Session.findOne({ where: userId, token });

    return session;
  };

  findSessionByUserId = async (userId) => {
    const session = await Session.findOne({ where: userId });

    return session;
  };

  deleteSession = async (sessionId) => {
    const success = await Session.destroy({ where: sessionId });

    return success;
  };
};
