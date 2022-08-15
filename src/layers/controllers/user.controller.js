const UserService = require("../services/user.service");

module.exports = class UserController {
  userService = new UserService();

  login = async (req, res) => {
    const { email, password } = req.body;

    const response = await this.userService.login(email, password);

    res
      .status(response.status)
      .json(
        response.result,
        response.result ? response.data : response.messege
      );
  };

  logout = async (req, res) => {
    const { sessionId } = req.body;
  };

  reIssue = async (req, res) => {
    const { refreshToken, accessToken } = req.header.common;

    const response = await this.userService;
  };
};
