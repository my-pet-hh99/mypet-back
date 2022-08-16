const UserRepository = require("../repositories/user.repository");
const { Access, Refresh } = require("../../config/secretKey");
const jwt = require("jsonwebtoken");

module.exports = class UserService {
  userRepository = new UserRepository();

  createUsers = async (email, nickname, password, answer) => {
    const emailVal = $("#email").val();
    const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
    const re_password = /^[a-zA-Z0-9]{4,30}$/;
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (emailVal.match(regExp) == null) {
      return { status: 400, result: false, message: "이메일 형식이 아닙니다" };
      // res.status(412).send({
      //   errorMessage: "이메일 형식이 아닙니다.",
      // });
    }
    if (password !== confirm) {
      return {
        status: 400,
        result: false,
        message: "패스워드가 일치하지 않습니다.",
      };
      // res.status(412).send({
      //   errorMessage: "패스워드가 일치하지 않습니다.",
      // });
    }

    if (nickname.search(re_nickname) === -1) {
      return {
        status: 400,
        result: false,
        message: "nickname의 형식이 일치하지 않습니다.",
      };

      // res.status(412).send({
      //   errorMessage: "nickname의 형식이 일치하지 않습니다.",
      // });
    }

    if (password.search(re_password) === -1) {
      return {
        status: 400,
        result: false,
        message: "패스워드 형식이 일치하지 않습니다.",
      };
    }

    //   res.status(412).send({
    //     errorMessage: "패스워드 형식이 일치하지 않습니다.",
    //   });

    const user = await Users.findAll({
      attributes: ["userId"],
      where: { nickname },
    });

    if (user.length) {
      return {
        status: 400,
        result: false,
        message: "중복된 닉네임입니다.",
      };

      // res.status(412).send({
      //   errorMessage: "중복된 닉네임입니다.",
      // });
    }
    // console.log(Users)

    const userCreateData = await this.userRepository.createUser(
      email,
      nickname,
      password,
      answer
    );

    return { status: 201, result: true, data: userCreateData };
  };

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
      return { status: 401, result: false, message: "" };
    }
  };

  reIssue = async (refreshToken, accessToken) => {
    try {
      const tokenValue = jwt.verify(refreshToken, Refresh.Secret);

      const session = await this.userRepository.findSession(
        tokenValue.sessionId
      );

      if (!session) {
        return { status: 401, result: false, message: "" };
      }

      const accessInfo = jwt.decode(accessToken);
      const newAccessToken = jwt.sign(accessInfo, Access.Secret, Access.Option);

      return { status: 201, result: true, data: newAccessToken };
    } catch (err) {
      return { status: 401, result: false, message: "" };
    }
  };
};
