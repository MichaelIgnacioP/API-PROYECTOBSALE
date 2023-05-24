// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

const app = express();

// Configuración de CORS
app.use(cors());

// Configuración de Body Parser
app.use(bodyParser.json());

// Rutas de inicio de sesión y registro
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

// Iniciar el servidor
const PORT = 3000; // Puedes cambiar el puerto si lo deseas
app.listen(PORT, () => {
  console.log(`Iniciando en el puerto ${PORT}`);
});
