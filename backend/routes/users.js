const express = require('express');
const router = express.Router();
const userCtrl = require('../controlers/user');
// const bouncer = require('express-bouncer')(5000,900000,5);

// middleware
const auth = require('../middleware/auth'),
    admin = require('../middleware/admin');

// /me
router.get('/me', auth, userCtrl.getUser);
router.delete('/me', auth, userCtrl.deleteUser);
router.put('/me', auth, userCtrl.updateUser);

// /:id
router.get('/:id', auth, admin, userCtrl.getUser);
router.put('/:id', auth, admin, userCtrl.updateUser);
router.delete('/:id', auth, admin, userCtrl.deleteUser);

module.exports = router;