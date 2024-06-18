const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es requerido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  }
});

module.exports = mongoose.model('User', userSchema);
