const express = require("express");
const router = express.Router();
const authmiddleware = require("../../middlewares/auth.middleware");
const s3imagedelete = require("../../middlewares/s3imagedelete.middleware");

const PostController = require("../controllers/post.controller");
const postController = new PostController();

router.get("/", postController.getPosts);
router.get("/:postId", postController.getPostById);
router.post("/", authmiddleware, postController.createPost);
router.put("/:postId", authmiddleware, postController.updatePost);
router.delete(
  "/:postId",
  authmiddleware,
  s3imagedelete,
  postController.deletePost
);

// http://localhost:8080/api/post

module.exports = router;
