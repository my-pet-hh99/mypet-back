const express = require("express");
const router = express.Router();
// const authmiddleware = require("../../middlewares/auth.middleware")

const PostController = require("../controllers/post.controller");
const postController = new PostController();

router.get('/', postController.getPosts)
router.post('/', postController.createPost)
router.put('/:postId', postController.updatePost)
router.delete('/:postId', postController.deletePost)


// http://localhost:8080/api/post

module.exports = router;
