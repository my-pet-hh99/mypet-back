const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

const needRefresh = require("../../middlewares/refresh.middleware");
const auth = require("../../middlewares/auth.middleware");

// http://localhost:3000/api/user]

// 회원가입
router.post("/signup", userController.signup);
router.get("/idCheck", userController.checkEmail);

// 로그인 & 로그아웃 & 토큰 재발급
router.post("/login", userController.login);
router.post("/token", needRefresh, userController.reIssue);
router.delete("/logout", needRefresh, userController.logout);

// 개인페이지
router.get("/me", auth, userController.me);
router.put("/edit", auth, userController.edit);
router.get("/quit", auth, userController.quit);
router.get("/pwCheck", auth, userController.checkPassword);

module.exports = router;
