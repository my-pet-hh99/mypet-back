const jwt = require("jsonwebtoken");
const { Access } = require("../config/secretKey");

module.exports = (req, res, next) => {
  const { accessToken } = req.headers.authorization;

  try {
    const tokenValue = jwt.verify(accessToken, Access.Secret);

    res.locals.userId = tokenValue.userId;
    res.locals.nickname = tokenValue.nickname;

    next();
  } catch (err) {
    res.status(401).json({ result: false, messege: "fail" });
  }
};
