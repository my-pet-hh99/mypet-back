const UserService = require("../services/user.service");
module.exports = class UserController {
  userService = new UserService();

  signup = async (req, res) => {
    const { email, nickname, password, confirm, answer } = req.body;

    const response = await this.userService.signup(
      email,
      nickname,
      password,
      confirm,
      answer
    );

    return res.status(response.status).json({
      result: response.result,
      data: response.data,
      message: response.message,
    });
  };

  checkEmail = async (req, res) => {
    const { email } = req.params;

    const response = await this.userService.checkEmail(email);

    res.status().json({});
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    const response = await this.userService.login(email, password);

    res.status(response.status).json({
      result: response.result,
      data: response.data,
      message: response.message,
    });
  };

  logout = async (req, res) => {
    const { sessionId } = res.locals;

    const response = await this.userService.logout();

    res.status(response.status).json({
      result: response.result,
      data: response.data,
      message: response.message,
    });
  };

  reIssue = async (req, res) => {
    const { refreshToken, accessToken } = req.header.authorization;

    const response = await this.userService.reIssue(refreshToken, accessToken);

    res.status(response.status).json({
      result: response.result,
      data: response.data,
      message: response.message,
    });
  };

  // editUserInfo = async (req, res) => {
  //   const { userId } = res.locals;
  //   const { nickname, password, answer } = req.body;

  //   const response = await this.userService;

  //   res.status()
  // };
};
