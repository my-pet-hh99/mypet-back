const UserRepository = require("../repositories/user.repository");
const { Access, Refresh } = require("../../config/secretKey");
const jwt = require("jsonwebtoken");

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

  login = async (email, password) => {
    if (!email || !password) {
      return { status: 400, result: false, messege: "Input value is empty" };
    }

    const user = await this.userRepository.findUserLogin(email, password);
    if (!user) {
      return {
        status: 400,
        result: false,
        messege: "Invalid nickname or password",
      };
    }

    const session = await this.userRepository.createSession(user.userId);

    const refreshToken = jwt.sign(
      {
        sessionId: session.sessionId,
        userId: user.userId,
      },
      Refresh.Secret,
      Refresh.Option
    );

    const accessToken = jwt.sign(
      {
        userId: user.userId,
        nickname: user.nickname,
      },
      Access.Secret,
      Access.Option
    );

    return { status: 201, result: true, data: { refreshToken, accessToken } };
  };

  logout = async (refreshToken) => {
    try {
      const tokenValue = jwt.verify(refreshToken, Refresh.Secret);

      const success = await this.userRepository.deleteSession(
        tokenValue.sessionId
      );

      return { status: 201, result: true };
    } catch (err) {
      return { status: 401, result: false, messege: "" };
    }
  };

  reIssue = async (refreshToken, accessToken) => {
    try {
      const tokenValue = jwt.verify(refreshToken, Refresh.Secret);

      const session = await this.userRepository.findSession(
        tokenValue.sessionId
      );

      if (!session) {
        return { status: 401, result: false, messege: "" };
      }

      const accessInfo = jwt.decode(accessToken);
      const newAccessToken = jwt.sign(accessInfo, Access.Secret, Access.Option);

      return { status: 201, result: true, data: newAccessToken };
    } catch (err) {
      return { status: 401, result: false, messege: "" };
    }
  };
};
