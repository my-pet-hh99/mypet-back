const CommentService = require("../services/comment.service");

module.exports = class CommentController {
  commentService = new CommentService();
};
