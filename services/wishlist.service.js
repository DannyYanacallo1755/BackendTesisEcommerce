// services/wishlist.service.js
const WishlistModel = require('../models/wishlist.model');

class WishlistService {
  static async addProductToWishlist(userId, productId) {
    const wishlist = await WishlistModel.findOne({ userId });
    if (wishlist) {
      wishlist.products.push({ productId });
      return wishlist.save();
    } else {
      const newWishlist = new WishlistModel({ userId, products: [{ productId }] });
      return newWishlist.save();
    }
  }

  static async getWishlist(userId) {
    return WishlistModel.findOne({ userId }).populate('products.productId');
  }

  static async removeProductFromWishlist(userId, productId) {
    const wishlist = await WishlistModel.findOne({ userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (product) => product.productId.toString() !== productId
      );
      return wishlist.save();
    }
  }
}

module.exports = WishlistService;

// services/cart.service.js
const CartModel = require('../models/cart.model');

class CartService {
  static async addProductToCart(userId, productId, quantity = 1) {
    const cart = await CartModel.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      return cart.save();
    } else {
      const newCart = new CartModel({ userId, products: [{ productId, quantity }] });
      return newCart.save();
    }
  }

  static async getCart(userId) {
    return CartModel.findOne({ userId }).populate('products.productId');
  }

  static async removeProductFromCart(userId, productId) {
    const cart = await CartModel.findOne({ userId });
    if (cart) {
      cart.products = cart.products.filter(
        (product) => product.productId.toString() !== productId
      );
      return cart.save();
    }
  }

  static async updateProductQuantity(userId, productId, quantity) {
    const cart = await CartModel.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
        return cart.save();
      }
    }
  }
}

module.exports = CartService;
