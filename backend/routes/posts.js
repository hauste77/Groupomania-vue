const express = require('express');
const router = express.Router();

const posts = require('../controlers/posts');
const comments = require('../controlers/comments');
const auth = require('../middleware/auth');

const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); //The memory storage engine stores the files in memory as Buffer objects

// admin users can
router.delete('/:id', auth, posts.deletePost);

// non admin users can
router.post('/', auth, upload.single( 'attachment' ), posts.createPost);
router.get('/', auth, posts.getAllPosts);
router.get('/me', auth, posts.getMyPosts);
router.get('/:id', auth, posts.getPost);
router.put('/:id', auth, upload.single( 'attachment' ), posts.updatePost);

router.get('/:id/comments/', auth, comments.getAllCommentsByPost);
router.post('/:id/comment', auth, upload.none(), comments.createComment);
router.delete('/:id/comment/:id', auth, comments.deleteComment);

module.exports = router;