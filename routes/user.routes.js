const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserServices = require('../services/user.service'); // Importa UserServices

// Ruta de registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    let user = await UserServices.getUserByEmail(email);
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await UserServices.registerUser(nombre, email, hashedPassword);

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserServices.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Generar token de autenticación
    const token = await UserServices.generateAccessToken({ _id: user._id, email: user.email }, "secret", "1h");

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await UserServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

module.exports = router;
