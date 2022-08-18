const UserService = require("../services/user.service");
module.exports = class UserController {
  userService = new UserService();

  signup = async (req, res) => {
    const { email, nickname, password, confirm, answer } = req.body;

    const response = await this.userService.createUsers(
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
    const { email } = req.query;

    const response = await this.userService.checkEmail(email);

    res.status(response.status).json({
      result: response.result,
      message: response.message,
    });
  };

  checkPassword = async (req, res) => {
    const { password } = req.query;
    const { userId } = res.locals;

    const response = await this.userService.checkPassword(userId, password);

    res.status(response.status).json({
      result: response.result,
      message: response.message,
    });
  };

  lostPassword = async (req, res) => {
    const { email, answer, password } = req.body;

    const response = await this.userService.lostPW(email, answer, password);

    res.status(response.status).json({
      result: response.result,
      message: response.message,
    });
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
    const { token, userId } = res.locals;

    const response = await this.userService.logout(token, userId);

    res.status(response.status).json({
      result: response.result,
      data: response.data,
      message: response.message,
    });
  };

  reIssue = async (req, res) => {
    const { token, userId } = res.locals;

    const response = await this.userService.reIssue(token, userId);

    res.status(response.status).json({
      result: response.result,
      data: response.data,
      message: response.message,
    });
  };

  me = async (req, res) => {
    const { userId } = res.locals;

    const response = await this.userService.userInfo(userId);

    res.status(response.status).json({
      result: response.result,
      data: response.data,
      message: response.message,
    });
  };

  edit = async (req, res) => {
    const { userId } = res.locals;
    const { nickname, password, answer } = req.body;

    const response = await this.userService.edit(
      userId,
      nickname,
      password,
      answer
    );

    res.status(response.status).json({
      result: response.result,
      message: response.message,
    });
  };

  quit = async (req, res) => {
    const { userId } = res.locals;
    const { password } = req.body;

    const response = await this.userService.quit(userId, password);

    res.status(response.status).json({
      result: response.result,
      message: response.message,
    });
  };
};
