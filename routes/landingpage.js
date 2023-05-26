const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');

router.get('/server', isAuthenticated, (req, res) => {
  res.send('Bienvenido/a a la página de aterrizaje');
});

module.exports = router;
