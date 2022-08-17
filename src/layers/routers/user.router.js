const express = require("express");
const userRouter = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

const needRefresh = require("../../middlewares/refresh.middleware");
const auth = require("../../middlewares/auth.middleware");
const hasToken = require("../../middlewares/hasToken.middleware");

// http://localhost:3000/api/user]

// 회원가입
userRouter.post("/signup", hasToken, userController.signup);
userRouter.get("/idCheck", hasToken, userController.checkEmail);

// 로그인 & 로그아웃 & 토큰 재발급
userRouter.post("/login", hasToken, userController.login);
userRouter.post("/token", needRefresh, userController.reIssue);
userRouter.delete("/logout", needRefresh, userController.logout);
userRouter.post("/lostPassword", userController.lostPassword);

// 개인페이지
userRouter
  .route("/me")
  .get(auth, userController.me) // 회원 정보 조회
  .put(auth, userController.edit) // 회원 정보 수정
  .delete(auth, userController.quit); // 회원 탈퇴
userRouter.get("/pwCheck", auth, userController.checkPassword);

module.exports = userRouter;
