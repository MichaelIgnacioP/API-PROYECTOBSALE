require('dotenv').config();
const express = require('express');
const db = require('./db');
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

