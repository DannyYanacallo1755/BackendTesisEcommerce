// src/controllers/wishlistController.js

const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user._id });
    res.send(wishlist);
  } catch (err) {
    res.status(500).send({ error: 'Error al obtener la lista de deseos' });
  }
};

exports.addToWishlist = async (req, res) => {
  const { food } = req.body;
  try {
    const wishlistItem = new Wishlist({ userId: req.user._id, ...food });
    await wishlistItem.save();
    res.status(201).send(wishlistItem);
  } catch (err) {
    res.status(500).send({ error: 'Error al agregar a la lista de deseos' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { foodId } = req.body;
  try {
    await Wishlist.deleteOne({ userId: req.user._id, _id: foodId });
    res.send({ message: 'Elemento eliminado de la lista de deseos' });
  } catch (err) {
    res.status(500).send({ error: 'Error al eliminar de la lista de deseos' });
  }
};
