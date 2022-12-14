const { User, Session } = require("../../models");
const { Op } = require("sequelize");

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
    const user = await User.findOne({ where: { userId } });

    return user;
  };

  findUserLogin = async (email, password) => {
    const user = await User.findOne({
      where: { [Op.and]: [{ email }, { password }] },
    });

    return user;
  };

  findUserByMail = async (email) => {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  };

  findPW = async (email, answer) => {
    const user = await User.findOne({
      where: { [Op.and]: [{ email }, { answer }] },
    });

    return user;
  };

  changePW = async (email, answer, password) => {
    const success = await User.update(
      { password },
      { where: { [Op.and]: [{ email }, { answer }] } }
    );

    return success;
  };

  editUser = async (nickname, password, answer, userId) => {
    const success = await User.update(
      { nickname, password, answer },
      { where: { userId } }
    );

    return success;
  };

  deleteUser = async (userId) => {
    const success = await User.destroy({ where: { userId } });

    return success;
  };

  createSession = async (userId, token) => {
    const session = await Session.create({ userId, token });

    return session;
  };

  findSession = async (userId, token) => {
    const session = await Session.findOne({
      where: { [Op.and]: [{ userId }, { token }] },
    });

    return session;
  };

  findSessionByUserId = async (userId) => {
    const session = await Session.findOne({ where: { userId } });

    return session;
  };

  deleteSession = async (sessionId) => {
    const success = await Session.destroy({ where: { sessionId } });

    return success;
  };
};
