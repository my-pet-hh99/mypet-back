const { Post } = require("../../models");

class PostRepository {
    findAllPost = async () => {
        const posts = await Post.findAll();
        console.log(posts)
        return posts;
    }
    createPost = async (imageUrl,text) {
        const createPost = await Post.create({
            imageUrl,
            text,
        })

        return createPost;
    }
}

module.exports = PostRepository;
