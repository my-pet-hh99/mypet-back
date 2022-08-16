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
    // try {
    //   // let userId = res.locals.userId;
    // } catch (err) {
    //   console.error(err)
    //   res.status(400).json({ message: "게시물 등록은 로그인 후 가능합니다." });
    // }
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
    // const userId = res.locals.userId;
    const userId = 1;
    
    try {
      const findPostById = await this.postService.findPostById(postId);

      if (!findPostById) {
        throw new Error("존재하지 않는 게시물")
      }
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: err.message});
    }

    if (userId == findPostById.userId) {
      let deletePostData = await this.postService.deletePost(userId, postId);

      deletePostData ? res.json({ message: `${postId} 번째 게시물 삭제` }) : res.status(400).json({ message: "존재하지 않는 게시물" });
    } else {
      res.status(400).json({message: "본인이 생성한 게시물만 삭제할 수 있습니다."})
    }
  }
}

module.exports = PostController;
