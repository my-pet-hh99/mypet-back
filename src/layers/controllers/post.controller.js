const PostService = require("../services/post.service");

class PostController {
  postService = new PostService();
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();

    console.log(posts)
    res.status(200).json({data: posts});
  }

  createPost = async (req, res, next) => {
    const {imageUrl, text } = req.body;
    console.log(res.locals)
    const createPostData = await this.postService.createPost(imageUrl, text);


    console.log(createPostData)
    res.status(201).json({ data: createPostData });
  }
}

module.exports = PostController;
