const jwt = require("jsonwebtoken");
const { Access } = require("../config/secretKey");

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization;
  const [type, token] = accessToken.split(" ");

  try {
    if (!token || type !== "Bearer") throw Error();

    const tokenValue = jwt.verify(token, Access.Secret);

    res.locals.userId = tokenValue.userId;
    res.locals.nickname = tokenValue.nickname;

    next();
  } catch (err) {
    res
      .status(401)
      .json({ result: false, messege: "토큰이 유효하지 않습니다." });
  }
};
