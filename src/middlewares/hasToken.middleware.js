module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    res.status(401).json({ result: false, message: "로그인 되어 있습니다." });
  } else {
    next();
  }
};
