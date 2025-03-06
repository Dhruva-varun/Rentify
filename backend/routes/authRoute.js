const express = require('express');
const { register, login, google } = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', google);

module.exports = router;