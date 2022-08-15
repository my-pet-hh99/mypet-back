const { Post } = require("../../models");
const { User } = require("../../models");

class PostRepository {
    findAllPost = async (offset) => {
        const posts = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ['email', 'nickname'],
                }
             ],
             limit:3,
             offset:offset,
        });


        return posts;
    }
    createPost = async (userId, imageUrl,text) => {
        const createPostData = await Post.create({
            userId,
            imageUrl,
            text,
        });

        return createPostData;
    }

    deletePost = async (postId) => {
        const deletePostData = Post.destroy({
            where: {postId},
        });

        return deletePostData;
    }
}

module.exports = PostRepository;
