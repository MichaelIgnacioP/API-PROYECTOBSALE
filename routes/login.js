const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Ruta de inicio de sesión
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña inválidos' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña inválida' });
    }

    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res.json({ message: 'Sesión iniciada exitosamente', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
  }
});


module.exports = router;

