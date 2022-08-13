const CommentService = require("../services/comment.service");
const joi = require('joi');

module.exports = class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    
    const { postId } = req.params;
    const { content } = req.body;
    const userId = 1;
    try {

      await joi.object({
        userId : joi.number().required(),
        postId : joi.number().required(),
        content : joi.string().required()

      }).validateAsync({ postId, userId, content });

      const result = this.commentService.createComment(userId, postId, content);
      return res.status(201).json('댓글 작성이 성공하였습니다.');

    } catch(err){
      console.log(err);
      return res.status(400).json('댓글 작성이 실패하였습니다.');
    }

  };
  getComment = async (req, res, next) => {

    const { postId } = req.params;
    try {

      await joi.object({
        postId : joi.number().required(),

      }).validateAsync({ postId});

      const result = this.commentService.createComment(postId);
      return res.status(201).json('댓글 조회가 성공하였습니다.');

    } catch(err){
      console.log(err);
      return res.status(400).json('댓글 조회가 실패하였습니다.');
    }


  };
  updateComment = async (req, res, next) => {

    const { commentId } = req.params;
    const { content } = req.body;
    const userId = 1;
    try {

      await joi.object({
        userId : joi.number().required(),
        commentId : joi.number().required(),
        content : joi.string().required()

      }).validateAsync({ commentId, userId, content });

      const result = this.commentService.createComment(userId, commentId, content);
      return res.status(201).json('댓글 수정이 성공하였습니다.');

    } catch(err){
      console.log(err);
      return res.status(400).json('댓글 수정이 실패하였습니다.');
    }


  };
  deleteComment = async (req, res, next) => {

    const { commentId } = req.params;
    const userId = 1;
    try {

      await joi.object({
        userId : joi.number().required(),
        commentId : joi.number().required(),

      }).validateAsync({ postId, userId });

      const result = this.commentService.createComment(userId, commentId);
      return res.status(201).json('댓글 삭제가 성공하였습니다.');

    } catch(err){
      console.log(err);
      return res.status(400).json('댓글 삭제가 실패하였습니다.');
    }

  };

};
