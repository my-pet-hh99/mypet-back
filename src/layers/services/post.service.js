const e = require("express");
const { text } = require("express");
require("dotenv/config");
const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async (offset) => {
    const allPost = await this.postRepository.findAllPost(offset);

    return allPost.map((post) => {
      return {
        postId: post.postId,
        imageUrl: process.env.S3_URL + post.imageUrl,
        text: post.text,
        author: post.User.nickname,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findPostById = async (postId) => {
    try {
      const post = await this.postRepository.findPostById(postId);

      return {
        postId: post.postId,
        imageUrl: process.env.S3_URL + post.imageUrl,
        text: post.text,
        author: post.User.nickname,
        userId: post.User.userId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    } catch (err) {
      console.error(err);

      return;
    }
  };

  createPost = async (userId, imageUrl, text) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      imageUrl,
      text
    );

    return {
      result: true,
    };
  };

  updatePost = async (postId, imageUrl, text) => {
    try {
      const updatePostData = await this.postRepository.updatePost(
        postId,
        imageUrl,
        text
      );

      return updatePostData;
    } catch (err) {
      console.error(err);

      return;
    }
  };

  deletePost = async (userId, postId) => {
    try {
      const deletePostData = await this.postRepository.deletePost(postId);

      return deletePostData;
    } catch (err) {
      console.error(err);

      return;
    }
  };
}

module.exports = PostService;
