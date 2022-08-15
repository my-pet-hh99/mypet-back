const CommentRepository = require("../repositories/comment.repository");
const PostRepository = require("../repositories/post.repository");

module.exports = class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  createComment = async (userId, postId, text) => {

    try {

      //const isExistPost = await this.postRepository.isExistPost()

      const result = await this.commentRepository.createComment(userId, postId, text);
      if (result.success === false) throw new Error('댓글 작성에 실패하였습니다.');
      return result;
      
    } catch(err){

      console.log(err);
      return { success : false, message : err.message };

    }
  };

  getComment = async (postId) => {
    try {

      //const isExistPost = await this.postRepository.isExistPost()

      const result = await this.commentRepository.getComment(postId);
      if (result.success === false) throw new Error('댓글 조회에 실패하였습니다.');
      return result;
      
      
    } catch(err){

      console.log(err);
      return { success : false, message : err.message };

    }

  };

  updateComment = async (userId, commentId, text) => {

    try {

      const isExistComment = await this.commentRepository.isExistComment(commentId);
      if (isExistComment === null) throw new Error('해당 댓글이 존재하지 않습니다');

      const result = await this.commentRepository.updateComment(commentId, text);
      if (result.success === false) throw new Error('댓글 수정에 실패하엿습니다.');
      return result;
      
      
    } catch(err){

      console.log(err);
      return { success : false, message : err.message };

    }

  };
  deleteComment = async (userId, commentId) => {

    try {

      const isExistComment = await this.commentRepository.isExistComment(commentId);
      if (isExistComment === null) throw new Error('해당 댓글이 존재하지 않습니다.');

      const result = await this.commentRepository.deleteComment(commentId);
      if (result.success === false) throw new Error('댓글 삭제에 실패하엿습니다.');
      return result;
      
    } catch(err){

      console.log(err);
      return { success : false, message : err.message };

    }

  };
};
