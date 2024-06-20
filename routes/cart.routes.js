// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth'); // Supongamos que tienes un middleware de autenticación

router.post('/add', auth, cartController.addProductToCart);
router.get('/', auth, cartController.getCart);
router.post('/remove', auth, cartController.removeProductFromCart);

module.exports = router;
