const express = require('express');
const authCtrl = require('../controlers/auth');
const bouncer = require('express-bouncer') ( 5000, 900000, 5 );

const router = express.Router();

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
// router.post('/login', bouncer.block, authCtrl.login);

module.exports = router;