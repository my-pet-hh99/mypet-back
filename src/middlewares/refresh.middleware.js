const jwt = require("jsonwebtoken");
const { Refresh } = require("../config/secretKey");

module.exports = (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const tokenValue = jwt.verify(refreshToken, Refresh.Secret);
    res.locals.userId = tokenValue.userId;
    res.locals.token = refreshToken;

    next();
  } catch (err) {
    res
      .status(401)
      .json({ result: false, messege: "토큰이 유효하지 않습니다." });
  }
};
