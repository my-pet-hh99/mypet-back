const CommentService = require("../services/comment.service");
const joi = require('joi');

module.exports = class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    
    const { postId } = req.params;
    const { text } = req.body;
    const userId = 1;
    try {

      await joi.object({
        userId : joi.number().required(),
        postId : joi.number().required(),
        text : joi.string().max(150).required()

      }).validateAsync({ postId, userId, text });

      const result = await this.commentService.createComment(userId, postId, text);
      return res.status(201).json({ ...result,  message : '댓글 작성이 성공하였습니다.'}) ;

    } catch(err){
      console.log(err);
      return res.status(400).json(err.message);
    }

  };
  getComment = async (req, res, next) => {

    const { postId } = req.params;
    try {

      await joi.object({
        postId : joi.number().required(),

      }).validateAsync({ postId});

      const result = await this.commentService.getComment(postId);
      return res.status(201).json(result) ;

    } catch(err){
      console.log(err);
      return res.status(400).json(err.message);
    }


  };
  updateComment = async (req, res, next) => {

    const { commentId } = req.params;
    const { text } = req.body;
    const userId = 1;
    try {

      await joi.object({
        userId : joi.number().required(),
        commentId : joi.number().required(),
        text : joi.string().max(150).required()

      }).validateAsync({ commentId, userId, text });

      const result = await this.commentService.updateComment(userId, commentId, text);
      return res.status(201).json( result);

    } catch(err){
      console.log(err);
      return res.status(400).json(err.message);
    }


  };
  deleteComment = async (req, res, next) => {

    const { commentId } = req.params;
    const userId = 1;
    try {

      await joi.object({
        userId : joi.number().required(),
        commentId : joi.number().required(),

      }).validateAsync({ commentId, userId });

      const result = await this.commentService.deleteComment(userId, commentId);
      return res.status(201).json(result);

    } catch(err){
      console.log(err);
      return res.status(400).json(err.message);
    }

  };

};
