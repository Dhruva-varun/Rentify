const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { createListing, deleteListing, updateListing, getListing } = require('../controllers/listingController.js');
const router = express.Router();

router.post('/create',verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
// router.get('/get', getListings);


module.exports = router;