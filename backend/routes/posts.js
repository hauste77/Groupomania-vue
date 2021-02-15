const express = require('express');
const router = express.Router();

const posts = require('../controlers/posts');
const auth = require('../middleware/auth');

const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// admin users can
router.delete('/:id', auth, posts.deletePost);

// non admin users can
router.post('/', auth, upload.single( 'attachment' ), posts.createPost);
router.get('/', auth, posts.getAllPosts);
router.get('/me', auth, posts.getMyPosts);
router.get('/:id', auth, posts.getPost);
router.put('/:id', auth, upload.single( 'attachment' ), posts.updatePost);

module.exports = router;