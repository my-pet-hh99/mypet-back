const jwt = require("jsonwebtoken");
const { Access } = require("../config/secretKey");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
   [type, accessToken]  = token.split(' ');
  if (type !== 'Bearer') throw Error();
  
  try {
    const tokenValue = jwt.verify(accessToken, Access.Secret);

    res.locals.userId = tokenValue.userId;
    res.locals.nickname = tokenValue.nickname;

    next();
  } catch (err) {
    res.status(401).json({ result: false, message: "fail" });
  }
};
