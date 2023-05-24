const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Ruta de inicio de sesión
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token de autenticación
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Devolver el token al cliente
    res.json({ token });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error en la autenticación' });
  }
});

module.exports = router;

