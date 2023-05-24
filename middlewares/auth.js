// middlewares/isAuthenticated.js
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ error: 'Token inválido' });
      }

      // Almacenar los datos del usuario validado en el objeto `req` para usarlos en la ruta protegida
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Token requerido' });
  }
};

module.exports = isAuthenticated;
