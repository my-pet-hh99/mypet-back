const { Comment, User, Post } = require("../../models");

module.exports = class CommentRepository {
  isExistComment = async (commentId) => {
    try {
      const result = await Comment.findByPk(commentId);
      if (result === null) return null;
      else return true;
      //return result.dataValues;
    } catch (err) {
      console.log(err);
      return { result: false, message: err.message };
    }
  };

  createComment = async (userId, postId, text) => {
    try {
      const result = await Comment.create({
        userId: userId,
        postId: postId,
        text: text,
      });
      return { result: true, data: result.dataValues };
    } catch (err) {
      console.log(err);
      return { result: false, message: err.message };
    }
  };

  getComment = async (postId) => {
    try {
      const comment = await Comment.findAll({
        where: { postId: postId },
        include: [
          {
            model: User,
            attributes: ["nickname"],
          },
        ],
        raw: true,
      });

      return { result: true, data: comment };
    } catch (err) {
      console.log(err);
      return { result: false };
    }
  };

  updateComment = async (commentId, text) => {
    try {
      const comment = await Comment.update(
        {
          text: text,
        },
        {
          where: {
            commentId: commentId,
          },
        }
      );
      if (comment[0] !== 1) throw new Error("댓글 수정에 실패하였습니다");
      return { result: true };
    } catch (err) {
      console.log(err);
      return { result: false };
    }
  };

  deleteComment = async (commentId) => {
    try {
      const result = await Comment.destroy({
        where: { commentId: commentId },
      });

      if (result !== 1) throw new Error("댓글 삭제에 실패하였습니다");
      return { result: true };
    } catch (err) {
      console.log(err);
      return { result: false };
    }
  };
};
