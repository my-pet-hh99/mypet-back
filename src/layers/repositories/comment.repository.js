const { Comment } = require("../../models");

module.exports = class CommentRepository {

    isExistComment = async (commentId) => {
        try {
            const result = await Comment.findByPk(commentId);
            if (result === null) return null;
            else return true;
            //return result.dataValues;

        } catch (err) {
            console.log(err);
            return { success : false, message : err.message};
        }
    };

    createComment = async (userId, postId, text) => {
        try {
            const result = await Comment.create({
        
                userId : userId,
                postId : postId,
                text : text
    
            });
            return { success : true, result : result.dataValues };

        } catch (err){
            console.log(err);
            return { success : false, message : err.message};
        }

    };

    getComment = async (postId) => {
        try {
            const result = await Comment.findAll( {
                where : { postId : postId}
            });
            return { success : true, result : result };

        } catch (err){

            console.log(err);
            return { success : false};
        }
    };

    updateComment = async (commentId, text) => {

        try {

            const result = await Comment.update({
                text : text

            }, {
                where : { 
                    commentId : commentId
                }
            });
            if (result[0] !== 1) throw new Error('댓글 수정에 실패하였습니다');
            return { success : true};

        } catch (err){

            console.log(err);
            return { success : false};
        }
    }

    deleteComment = async (commentId) => {
        try {

            const result = await Comment.destroy( {

                where: { commentId : commentId}
              });
              
            if (result !== 1) throw new Error('댓글 삭제에 실패하였습니다');
            return { success : true, result : result };

        } catch (err){

            console.log(err);
            return { success : false};
        }
    }

};
