const express = require('express');
const router = express.Router();

const posts = require('../controlers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');
const admin = require('../middleware/admin')

// admin users can
router.delete('/:id', auth, posts.deletePost);

// non admin users can
router.post('/', auth, posts.createPost);
router.get('/', auth, posts.getAllPosts);
router.get('/me', auth, posts.getMyPosts);
router.get('/:id', auth, posts.getPost);
router.put('/:id', auth, posts.updatePost);

module.exports = router;