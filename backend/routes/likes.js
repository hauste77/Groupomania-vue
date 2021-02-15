const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const likes = require('../controlers/likes');

// Likes
router.post('/posts/:postId/like', auth, likes.likeDislike);
router.get('/posts/:postId/like', auth, likes.likeDislikeAll);

module.exports = router;