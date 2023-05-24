const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Ruta de registro
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'El usuario ya está registrado' });
    }

    // Crear una nueva instancia del modelo User
    const newUser = new User({ email, password });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el registro' });
  }
});

module.exports = router;
