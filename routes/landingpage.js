const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');

router.get('/', isAuthenticated, (req, res) => {
  res.send('Bienvenido/a a la página de aterrizaje');
});

router.post('/contact', isAuthenticated, (req, res) => {
    const { name, email, message } = req.body;
    res.json({ message: 'Formulario de contacto completado exitosamente' });
  });

module.exports = router;
