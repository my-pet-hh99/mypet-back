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
      if (user === null) throw new Error('없는 사용자입니다.');

      //const isExistPost = await this.postRepository.isExistPost()

      const isCreated = await this.commentRepository.createComment(userId, postId, text);
      if (isCreated.result === false) throw new Error('댓글 작성에 실패하였습니다.');

      return { result : isCreated.result };
      
    } catch(err){

      console.log(err);
      return { result: false, message : err.message };

    }
  };

  getComment = async (postId) => {
    try {

      //const isExistPost = await this.postRepository.isExistPost()

      const comment = await this.commentRepository.getComment(postId);
      if (comment.result === false) throw new Error('댓글 목록 조회에 실패하였습니다.');
      const commentdata = comment.data.map(data => {
        return {
          commentId : data.commentId,
          text : data.text,
          createdAt : data.createdAt,
          updatedAt : data.updatedAt,
          userId : data.userId,
          postId : data.postId,
          author : data['User.nickname']
        }

      })
      return { result : comment.result, data : commentdata};     
      
    } catch(err){

      console.log(err);
      return { result : false, message : err.message };

    }

  };

  updateComment = async (userId, commentId, text) => {

    try {

      const isExistComment = await this.commentRepository.isExistComment(commentId);
      if (isExistComment === null) throw new Error('해당 댓글이 존재하지 않습니다');

      const comment = await this.commentRepository.updateComment(commentId, text);
      if (comment.result === false) throw new Error('댓글 수정에 실패하엿습니다.');
      return { result : comment.result };
      
      
    } catch(err){

      console.log(err);
      return { result : false, message : err.message };

    }

  };
  deleteComment = async (userId, commentId) => {

    try {

      const isExistComment = await this.commentRepository.isExistComment(commentId);
      if (isExistComment === null) throw new Error('해당 댓글이 존재하지 않습니다.');

      const comment = await this.commentRepository.deleteComment(commentId);
      if (comment.result === false) throw new Error('댓글 삭제에 실패하엿습니다.');
      return { result : comment.result };
      
    } catch(err){

      console.log(err);
      return { result : false, message : err.message };

    }

  };
};
