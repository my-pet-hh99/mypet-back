const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const postRouter = require("./post.router");
const commentRouter = require("./comment.router");

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

module.exports = router;
