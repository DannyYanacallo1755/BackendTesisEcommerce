const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: false },
  available: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Food', foodSchema);
