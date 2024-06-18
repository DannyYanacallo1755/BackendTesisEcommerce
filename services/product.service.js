const ProductModel = require('../models/product.model');

class ProductService {
  static async getAllProducts() {
    try {
      return await ProductModel.find();
    } catch (err) {
      throw err;
    }
  }

  static async getProductById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductService;
