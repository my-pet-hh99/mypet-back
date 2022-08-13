const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post.controller");
const postController = new PostController();

// http://localhost:8080/api/post

module.exports = router;
