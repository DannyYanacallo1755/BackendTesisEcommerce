const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.post('/create', ProductController.createProduct);
router.get('/list', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
