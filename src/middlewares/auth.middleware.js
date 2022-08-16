const jwt = require("jsonwebtoken");
const { Access } = require("../config/secretKey");

module.exports  = (req, res, next) => {
  const token = req.headers.authorization;
  const [type, accessToken]  = token.split(' ');

  try {
    if ( !accessToken ||type !== 'Bearer') throw Error();
  
    const tokenValue = jwt.verify(accessToken, Access.Secret);

    res.locals.userId = tokenValue.userId;
    res.locals.nickname = tokenValue.nickname;

    next();
  } catch (err) {
    res
      .status(401)
      .json({ result: false, messege: "토큰이 유효하지 않습니다." });
  }
};
