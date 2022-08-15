const { User, Sessions } = require("../../models");

module.exports = class UserRepository {
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

  findUserByNN = async (nickname) => {
    const user = await User.findOne({
      where: { nickname },
    });

    return user;
  };

  createUser = async (email, nickname, password, answer) => {
    const user = await User.create({ email, nickname, password, answer });

    return user;
  };

  createSession = async (userId) => {
    const session = await Sessions.create({ userId });

    return session;
  };

  findSession = async (sessionId) => {
    const session = await Sessions.findByPk(sessionId);

    return session;
  };

  deleteSession = async (sessionId) => {
    const success = await Sessions.destroy({ where: sessionId });

    return success;
  };
};
