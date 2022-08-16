const express = require("express");
const commentRouter = express.Router();

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();
const authmiddleware = require("../../middlewares/auth.middleware");


commentRouter.route('/:postId')
    .post(authmiddleware, commentController.createComment)
    .get(commentController.getComment);

commentRouter.route('/:commentId')
    .put(authmiddleware, commentController.updateComment)
    .delete(authmiddleware, commentController.deleteComment);

// http://localhost:8080/api/comment

module.exports = commentRouter;
