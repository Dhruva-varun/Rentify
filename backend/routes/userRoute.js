const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { updateUser, deleteUser } = require('../controllers/userController.js');
const router = express.Router();

router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);

module.exports = router;