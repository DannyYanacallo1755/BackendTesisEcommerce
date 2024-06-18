const FoodModel = require('../models/food.model');

class FoodService {
  static async getAllFoods() {
    return await FoodModel.find();
  }

  static async getFoodById(id) {
    return await FoodModel.findById(id); // Asegúrate de usar findById
  }
}

module.exports = FoodService;
