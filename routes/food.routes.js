const express = require('express');
const router = express.Router();
const FoodController = require('../controller/food.controller');

router.get('/', FoodController.getAllFoods);
router.get('/:id', FoodController.getFoodById); // Asegúrate de que el controlador use findById

module.exports = router;
