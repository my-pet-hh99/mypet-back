const CommentRepository = require("../repositories/comment.repository");

module.exports = class CommentService {
  commentRepository = new CommentRepository();

  createComment = async (userId, postId, content) => {

    try {

      const isExistPost = await this.commentRepository.isExistPost()


      
    } catch(err){

      console.log(err);
      return res.status(400).json('댓글 작성이 실패하였습니다');

    }
  };

  getComment = async (postId) => {

    try {

      
      
    } catch(err){

      console.log(err);
      return res.status(400).json('댓글 작성이 실패하였습니다');

    }

  };
  updateComment = async (userId, commentId, content) => {

    try {

      
      
    } catch(err){

      console.log(err);
      return res.status(400).json('댓글 작성이 실패하였습니다');

    }

  };
  deleteComment = async (userId, commentId) => {

    try {

      
      
    } catch(err){

      console.log(err);
      return res.status(400).json('댓글 작성이 실패하였습니다');

    }

  };
};
