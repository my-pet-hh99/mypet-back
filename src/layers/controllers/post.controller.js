const PostService = require("../services/post.service");

class PostController {
  postService = new PostService();
  getPosts = async (req, res, next) => {
    let offset = Number(req.query.offset) * 3 + 1
    console.log(offset)
    const posts = await this.postService.findAllPost(offset);

    res.status(200).json({posts});
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
    const text = req.body.text;
    const updatePostData = await this.postService.updatePost(postId, text);

    res.json({ message: `${postId} 번째 게시물 수정` });
  }

  deletePost = async (req, res, next) => {
    const postId = Number(req.params.postId);
    const deletePostData = await this.postService.deletePost(postId);

    res.json({ message: `${postId} 번째 게시물 삭제` });
  }
}

module.exports = PostController;
