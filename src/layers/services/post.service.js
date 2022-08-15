const { text } = require("express");
const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();
    console.log(allPost);
  }
  createPost = async () => {
    const createPostData = await this.postRepository.createPost(imageUrl, text);

    return {
      result: true
    };
  }
}

module.exports =  PostService;
