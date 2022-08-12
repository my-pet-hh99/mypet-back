const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

// http://localhost:8080/api/comment

module.exports = router;
