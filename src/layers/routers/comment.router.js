const express = require("express");
const commentRouter = express.Router();

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

commentRouter.route('/:postId')
    .post(commentController.createComment)
    .get(commentController.getComment);

commentRouter.route('/:commentId')
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);

// http://localhost:8080/api/comment

module.exports = commentRouter;
