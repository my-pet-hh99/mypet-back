const UserService = require("../services/user.service");
createUsers = async (req, res) => {
  const { email, nickname, password } = req.body;

  const emailVal = $("#email").val();
  const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
  const re_password = /^[a-zA-Z0-9]{4,30}$/;
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (emailVal.match(regExp) == null) {
    return res.status(412).send({
      errorMessage: "이메일 형식이 아닙니다.",
    });
  }
  if (password !== confirm) {
    return res.status(412).send({
      errorMessage: "패스워드가 일치하지 않습니다.",
    });
  }

  if (nickname.search(re_nickname) === -1) {
    return res.status(412).send({
      errorMessage: "nickname의 형식이 일치하지 않습니다.",
    });
  }

  if (password.search(re_password) === -1) {
    return res.status(412).send({
      errorMessage: "패스워드 형식이 일치하지 않습니다.",
    });
  }
  const user = await Users.findAll({
    attributes: ["userId"],
    where: { nickname },
  });
  console.log(user);

  if (user.length) {
    return res.status(412).send({
      errorMessage: "중복된 닉네임입니다.",
    });
  }
  // console.log(Users)
  await Users.create({ email, nickname, password });
  console.log(`${nickname} 님이 가입하셨습니다.`);

  return res.status(201).json({ message: "회원 가입에 성공하였습니다." });
};

module.exports = class UserController {
  userService = new UserService();
};
