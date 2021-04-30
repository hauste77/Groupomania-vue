const express = require('express');
const router = express.Router();
const userCtrl = require('../controlers/user');

// middleware
const auth = require('../middleware/auth'),
    admin = require('../middleware/admin');

// /me
router.get('/me', auth, userCtrl.getUser);
router.delete('/me', auth, userCtrl.deleteUser);
router.put('/me', auth, userCtrl.updateUser);

// all
router.get('/', auth, admin, userCtrl.getUsers);

// /:id
router.get('/:id', auth, admin, userCtrl.getUser);
router.delete('/:id', auth, admin, userCtrl.deleteUser);

module.exports = router;