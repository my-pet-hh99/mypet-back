const CommentRepository = require("../repositories/comment.repository");

module.exports = class CommentService {
  commentRepository = new CommentRepository();
};
