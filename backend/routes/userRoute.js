const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { updateUser } = require('../controllers/userController.js');
const router = express.Router();

router.post('/update/:id',verifyToken, updateUser);

module.exports = router;