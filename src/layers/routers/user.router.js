const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

// http://localhost:3000/api/user
// 회원가입 / 로그인 / 재발급 / 정보 수정 / 로그아웃 / 회원탈퇴

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/token", userController.reIssue);
router.delete("/logout", userController.logout);
router.get("/idCheck", userController.checkEmail);
// router.patch("/edit", userController);
router.get("/quit", userController.logout);

// router.get("/");

module.exports = router;
