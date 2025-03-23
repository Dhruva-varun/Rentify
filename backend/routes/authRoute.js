const express = require('express');
const { register, login, google, logout } = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', google);
router.get('/logout', logout);

module.exports = router;