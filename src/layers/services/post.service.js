const PostRepository = require("../repositories/post.repository");

module.exports = class PostService {
  postRepository = new PostRepository();
};
