const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { createListing } = require('../controllers/listingController.js');
const router = express.Router();

router.post('/create',createListing);


module.exports = router;