const PostService = require("../services/post.service");

module.exports = class PostController {
  postService = new PostService();
};
