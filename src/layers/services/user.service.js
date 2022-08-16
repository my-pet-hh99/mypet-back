const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/user.repository");
const { Access, Refresh } = require("../../config/secretKey");
const jwt = require("jsonwebtoken");
const Bcrypt = require('../../modules/bcrypt');

module.exports = class UserService {
  userRepository = new UserRepository();
  bcrypt = new Bcrypt();


  createUsers = async (email, nickname, password, confirm, answer) => {
    if (!email || !nickname || !password || !confirm || !answer) {
      return { status: 400, result: false, message: "입력칸이 비어 있습니다." };
    }

    const pwExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    const emailExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!emailExp.test(email)) {
      return { status: 400, result: false, message: "이메일 형식이 아닙니다" };
      };

    if (password !== confirm) {
      return {
        status: 400,
        result: false,
        message: "암호가 암호 확인란과 일치하지 않습니다.",
      };
    }

    if (nickname.length > 10 || nickname.length < 1) {
      return {
        status: 400,
        result: false,
        message: "닉네임의 형식을 확인해 주세요.",
      };
    }

    if (pwExp.test(password)) {
      return {
        status: 400,
        result: false,
        message: "패스워드 형식을 확인해 주세요.",
      };
    }
    const existEmail = await this.userRepository.findUserByMail(email);
    if (existEmail) {
      return {
        status: 400,
        result: false,
        message: "이미 존재하는 이메일 입니다.",
      };
    }
    

    if ( nickname.length > 10 || nickname.length < 1 ) {
      return {
        status: 400,
        result: false,
        message: "닉네임 길이가 형식에 맞지 않습니다.",
      };
    }

    const hashedpassword = await this.bcrypt.bcryptPassword(password);

    const userCreateData = await this.userRepository.createUser(
      email,
      nickname,
      hashedpassword,
      answer
    );

    return { status: 200, result: true, data: userCreateData };
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

    const user = await this.userRepository.findUserByMail(email);
    const hashedpassword = user?.dataValues.password;
    const comparePassword = await bcrypt.compare(password, hashedpassword);
    if (!comparePassword) {
      return {
        status: 400,
        result: false,
        message: "비밀번호가 틀렸습니다.",
      };
    };

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
