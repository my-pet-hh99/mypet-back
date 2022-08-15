const { text } = require("express");
const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    console.log(allPost);

    return allPost.map(post => {
      return {
        author: post.User.nickname,
        postId: post.posdId,
        text: post.text,
        imageUrl: post.imageUrl,
      }
    })
  }
  createPost = async (userId, imageUrl, text) => {
    const createPostData = await this.postRepository.createPost(userId, imageUrl, text);

    return {
      result: true
    };
  }
}

module.exports =  PostService;
