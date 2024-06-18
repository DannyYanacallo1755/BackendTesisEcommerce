const FoodService = require('../services/food.service');

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await FoodService.getAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await FoodService.getFoodById(req.params.id); // Asegúrate de usar findById
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
