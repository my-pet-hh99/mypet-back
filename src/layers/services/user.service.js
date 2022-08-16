const UserRepository = require("../repositories/user.repository");
const { Access, Refresh } = require("../../config/secretKey");
const jwt = require("jsonwebtoken");
const { bcryptPassword } = require('../../modules/bcrypt');

module.exports = class UserService {
  userRepository = new UserRepository();

  signup = async (email, nickname, password, confirm, answer) => {
    if (!email || !nickname || !password || !confirm || !answer) {
      return { status: 400, result: false, message: "입력값이 비어 있습니다." };
    }

    const pwExp = /^[a-zA-Z0-9]{4,30}$/;
    const emailExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    // const regE = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    if (emailExp.test(email)) {
      return {
        status: 400,
        result: false,
        message: "이메일이 형식에 맞지 않습니다.",
      };
    } else if (pwExp.test(password)) {
      return {
        status: 400,
        result: false,
        message: "암호가 형식에 맞지 않습니다.",
      };
    }

    if (password !== confirm) {
      return {
        status: 400,
        result: false,
        message: "암호가 암호 확인란과 일치하지 않습니다.",
      };
      //   errorMessage: "패스워드가 일치하지 않습니다.",
      // });
    }

    if (nickname.length < 10 || nickname.length > 1) {
      return {
        status: 400,
        result: false,
        message: "닉네임 길이가 형식에 맞지 않습니다.",
      };
    }

    const existUser = await this.userRepository.findUserByMail(email);
    if (existUser) {
      return {
        status: 400,
        result: false,
        message: "중복된 이메일입니다.",
      };
    }
    const hashedpassword = await bcryptPassword(password);

    const userCreateData = await this.userRepository.createUser(
      email,
      nickname,
      password,
      answer
    );

    return { status: 201, result: true, data: userCreateData };
  };

  checkEmail = async (email) => {
    if (!email) {
      return { status: 200, result: false, message: "입력값이 비어 있습니다." };
    }
    const existUser = await this.userRepository.findUserByMail(email);

    if (existUser) {
      return {
        status: 400,
        result: false,
        message: "중복된 이메일입니다.",
      };
    }

    return { status: 200, result: true };
  };

  login = async (email, password) => {
    if (!email || !password) {
      return { status: 400, result: false, message: "입력값이 비어 있습니다." };
    }

    const user = await this.userRepository.findUserLogin(email, password);
    if (!user) {
      return {
        status: 400,
        result: false,
        message: "존재하지 않는 정보입니다.",
      };
    }

    const existSession = await this.userRepository.findSessionByUserId(
      user.userId
    );
    if (existSession) {
      await this.userRepository.deleteSession(user.userId);
    }

    const refreshToken = jwt.sign(
      {
        userId: user.userId,
      },
      Refresh.Secret,
      Refresh.Option
    );

    await this.userRepository.createSession(user.userId, refreshToken);

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
      if (!refreshToken) {
        return {
          status: 400,
          result: false,
          message: "입력값이 비어 있습니다.",
        };
      }
      const tokenValue = jwt.verify(refreshToken, Refresh.Secret);
      const session = await this.userRepository.findSession(tokenValue.userId);

      if (!session) {
        return {
          status: 401,
          result: false,
          message: "토큰이 유효하지 않습니다.",
        };
      }

      await this.userRepository.deleteSession(session.sessionId);

      return { status: 201, result: true };
    } catch (err) {
      return {
        status: 401,
        result: false,
        message: "토큰이 유효하지 않습니다.",
      };
    }
  };

  // edit = async (userId, nickname, password, answer) => {};

  reIssue = async (refreshToken) => {
    try {
      const tokenValue = jwt.verify(refreshToken, Refresh.Secret);

      const session = await this.userRepository.findSession(
        tokenValue.userId,
        refreshToken
      );
      if (!session) {
        return {
          status: 401,
          result: false,
          message: "토큰이 유효하지 않습니다.",
        };
      }

      const accessToken = jwt.sign(accessInfo, Access.Secret, Access.Option);

      return { status: 201, result: true, data: accessToken };
    } catch (err) {
      return {
        status: 401,
        result: false,
        message: "토큰이 유효하지 않습니다.",
      };
    }
  };
};
