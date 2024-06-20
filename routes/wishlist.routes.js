// src/routes/wishlist.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const WishlistController = require('../controllers/wishlistController');

router.get('/', authMiddleware, WishlistController.getWishlist);
router.post('/add', authMiddleware, WishlistController.addToWishlist);
router.post('/remove', authMiddleware, WishlistController.removeFromWishlist);

module.exports = router;
