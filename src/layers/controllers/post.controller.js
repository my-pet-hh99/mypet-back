const PostService = require("../services/post.service");

class PostController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    let offset = Number(req.query.offset) * 3 + 1
    const posts = await this.postService.findAllPost(offset);

    res.status(200).json({posts});
  }

  getPostById = async (req, res, next) => {
    const postId = Number(req.params.postId);
    const post = await this.postService.findPostById(postId);


    post ? res.status(200).json({ data: post }) : res.status(400).json({ message: "존재하지 않는 게시물" });
  }

  createPost = async (req, res, next) => {
    const {imageUrl, text } = req.body;
    // console.log(res.locals)
    let userId = 1;
    const createPostData = await this.postService.createPost(userId, imageUrl, text);

    res.status(201).json({ data: createPostData });
  }

  updatePost = async (req, res, next) => {
    const postId = Number(req.params.postId);
    const imageUrl = req.body.imageUrl;
    const text = req.body.text;

    const updatePostData = await this.postService.updatePost(postId, imageUrl, text);


    updatePostData[0] ? res.json({ message: `${postId} 번째 게시물 업데이트` }) : res.status(400).json({ message: "존재하지 않는 게시물" });
  }

  deletePost = async (req, res, next) => {
    const postId = Number(req.params.postId);
    const deletePostData = await this.postService.deletePost(postId);

    deletePostData ? res.json({ message: `${postId} 번째 게시물 삭제` }) : res.status(400).json({ message: "존재하지 않는 게시물" });
  }
}

module.exports = PostController;
