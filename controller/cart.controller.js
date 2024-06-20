// controllers/cartController.js
const Cart = require('../models/Cart'); // Asegúrate de tener un modelo Cart

exports.addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // Supongamos que tienes la identificación del usuario en req.user

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
    } else {
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity: 1 }]
      });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
      await cart.save();
      return res.status(200).json({ success: true, cart });
    }

    res.status(404).json({ success: false, message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
