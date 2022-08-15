const { text } = require("express");
const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async (offset) => {
    const allPost = await this.postRepository.findAllPost(offset);

    return allPost.map(post => {
      return {
        postId: post.postId,
        imageUrl: post.imageUrl,
        text: post.text,
        author: post.User.nickname,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }
    })
  }
  createPost = async (userId, imageUrl, text) => {
    const createPostData = await this.postRepository.createPost(userId, imageUrl, text);

    return {
      result: true
    };
  }

  deletePost = async (postId) => {
    const deletePostData = await this.postRepository.deletePost(postId)

    return {
      result: true
    }
  }
}

module.exports =  PostService;
