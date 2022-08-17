const UserRepository = require("../repositories/user.repository");
const { Access, Refresh } = require("../../config/secretKey");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Bcrypt = require("../../modules/bcrypt");

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

    // const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    // const regE = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    if (!emailExp.test(email)) {
      return {
        status: 400,
        result: false,
        message: "이메일이 형식에 맞지 않습니다.",
      };
    } else if (!pwExp.test(password)) {
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
    }

    if (nickname.length > 10 || nickname.length < 1) {
      return {
        status: 400,
        result: false,
        message: "닉네임의 형식을 확인해 주세요.",
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

    const hashedPassword = await this.bcrypt.bcryptPassword(password);

    const userCreateData = await this.userRepository.createUser(
      email,
      nickname,
      hashedPassword,
      answer
    );

    return { status: 201, result: true, data: userCreateData };
  };

  checkEmail = async (email) => {
    if (!email) {
      return { status: 400, result: false, message: "입력값이 비어 있습니다." };
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

  checkPassword = async (userId, password) => {
    if (!password) {
      return { status: 400, result: false, message: "입력값이 비어 있습니다." };
    }
    const user = await this.userRepository.findUserById(userId);
    const hashedPassword = user.password;
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      return {
        status: 400,
        result: false,
        message: "암호가 올바르지 않습니다.",
      };
    }

    return { status: 200, result: true };
  };

  login = async (email, password) => {
    if (!email || !password) {
      return { status: 400, result: false, message: "입력값이 비어 있습니다." };
    }

    const user = await this.userRepository.findUserByMail(email);
    if (!user) {
      return {
        status: 400,
        result: false,
        message: "존재하지 않는 정보입니다.",
      };
    }

    const hashedPassword = user.password;
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
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
      await this.userRepository.deleteSession(existSession.sessionId);
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

  logout = async (token, userId) => {
    const session = await this.userRepository.findSession(userId, token);
    if (!session) {
      return {
        status: 401,
        result: false,
        message: "로그아웃 된 토큰입니다.",
      };
    }

    await this.userRepository.deleteSession(session.sessionId);

    return { status: 200, result: true };
  };

  edit = async (userId, nickname, password, answer) => {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      console.log("회원탈퇴 후 접근 : ", userId);
      return {
        status: 401,
        result: false,
        message: "존재하지 않는 정보입니다.",
      };
    }

    if (!nickname || !answer) {
      return { status: 400, result: false, message: "입력값이 비어 있습니다." };
    } else if (nickname.length > 10) {
      return {
        status: 400,
        result: false,
        message: "닉네임이 형식에 맞지 않습니다.",
      };
    }

    const pwExp = /^[a-zA-Z0-9]{4,30}$/;
    if (!password) {
      password = user.password;
    } else if (!pwExp.test(password)) {
      return {
        status: 400,
        result: false,
        message: "암호가 형식에 맞지 않습니다.",
      };
    } else {
      const hashedPassword = await this.bcrypt.bcryptPassword(password);
    }

    await this.userRepository.editUser(
      nickname,
      hashedPassword,
      answer,
      userId
    );

    return { status: 201, result: true };
  };

  lostPW = async (email, answer, password) => {
    if (!eamil || !answer) {
      return { status: 400, result: false, message: "입력값이 비어 있습니다." };
    }

    const user = await this.userRepository.findPW(email, answer);
    if (!user) {
      return {
        status: 400,
        result: false,
        message: "존재하지 않는 정보입니다.",
      };
    }
    const hashedPassword = await this.bcrypt.bcryptPassword(password);
    const success = await this.userRepository.changePW(
      email,
      answer,
      hashedPassword
    );

    return { status: 201, result: true };
  };

  quit = async (userId, password) => {
    if (!password) {
      return {
        status: 400,
        result: false,
        message: "암호가 입력되지 않았습니다.",
      };
    }

    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      console.log("회원탈퇴 후 접근 : ", userId);
      return {
        status: 400,
        result: false,
        message: "존재하지 않는 정보입니다.",
      };
    }
    const hashedPassword = user.password;
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      return {
        status: 400,
        result: false,
        message: "암호가 올바르지 않습니다.",
      };
    }

    await this.userRepository.deleteUser(userId);

    return { status: 200, result: true };
  };

  userInfo = async (userId) => {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      console.log("회원탈퇴 후 접근 : ", userId);
      return {
        status: 400,
        result: false,
        message: "존재하지 않는 정보입니다.",
      };
    }

    const data = {
      userId,
      email: user.email,
      nickname: user.nickname,
      answer: user.answer,
    };

    return { status: 200, result: true, data };
  };

  reIssue = async (token, userId) => {
    const session = await this.userRepository.findSession(userId, token);
    if (!session) {
      return {
        status: 401,
        result: false,
        message: "로그아웃 된 토큰입니다.",
      };
    }

    const user = await this.userRepository.findUserById(session.userId);
    const accessToken = jwt.sign(
      {
        userId: user.userId,
        nickname: user.nickname,
      },
      Access.Secret,
      Access.Option
    );

    return { status: 200, result: true, data: accessToken };
  };
};
