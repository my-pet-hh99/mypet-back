const { Post } = require("../../models");
const { User } = require("../../models");

class PostRepository {
    findAllPost = async () => {
        const posts = await Post.findAll({
            include:User,
        });
        
        return posts;
    }
    createPost = async (userId, imageUrl,text) => {
        const createPost = await Post.create({
            userId,
            imageUrl,
            text,
        });

        console.log(createPost)

        return createPost;
    }
}

module.exports = PostRepository;
