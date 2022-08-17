const CommentRepository = require("../repositories/comment.repository");
const PostRepository = require("../repositories/post.repository");
const UserRepository = require("../repositories/user.repository");

module.exports = class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();
  userRepository = new UserRepository();

  createComment = async (userId, postId, text) => {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (user === null) throw new Error("400,존재하지 않는 사용자입니다.");

      const isExistPost = await this.postRepository.findPostById(postId);

      const isCreated = await this.commentRepository.createComment(
        userId,
        postId,
        text
      );
      if (isCreated.result === false)
        throw new Error("400,댓글 작성에 실패하였습니다.");

      return { result: isCreated.result };
    } catch (err) {
      return { result: false, message: err.message };
    }
  };

  getComment = async (postId) => {
    try {
      const comment = await this.commentRepository.getComment(postId);
      if (comment.result === false)
        throw new Error("400,댓글 목록 조회에 실패하였습니다.");
      const commentdata = comment.data.map((data) => {
        return {
          commentId: data.commentId,
          text: data.text,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          userId: data.userId,
          postId: data.postId,
          author: data["User.nickname"],
        };
      });
      return { result: comment.result, data: commentdata };
    } catch (err) {
      console.log(err);
      return { result: false, message: err.message };
    }
  };

  updateComment = async (userId, commentId, text) => {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (user === null) throw new Error("400,존재하지 않는 사용자입니다.");

      const comment = await this.commentRepository.getCommentById(commentId);
      if (comment === null)
        throw new Error("404,해당 댓글이 존재하지 않습니다.");
      else if (userId !== comment.userId)
        throw new Error("401,권한이 없는 사용자입니다.");

      const isUpdated = await this.commentRepository.updateComment(
        commentId,
        text
      );
      if (isUpdated.result === false)
        throw new Error("400,댓글 수정에 실패하엿습니다.");
      return { result: isUpdated.result };
    } catch (err) {
      console.log(err);
      return { result: false, message: err.message };
    }
  };
  deleteComment = async (userId, commentId) => {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (user === null) throw new Error("400,존재하지 않는 사용자입니다.");

      const comment = await this.commentRepository.getCommentById(commentId);
      if (comment === null)
        throw new Error("404,해당 댓글이 존재하지 않습니다.");
      else if (userId !== comment.userId)
        throw new Error("401,권한이 없는 사용자입니다.");

      const isDeleted = await this.commentRepository.deleteComment(commentId);
      if (isDeleted.result === false)
        throw new Error("400,댓글 삭제에 실패하엿습니다.");
      return { result: isDeleted.result };
    } catch (err) {
      console.log(err);
      return { result: false, message: err.message };
    }
  };
};
