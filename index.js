require('dotenv').config();
const express = require('express');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const landingPageRoutes = require('./routes/landingpage');
const contactNotification = require('./routes/contact')

const app = express();

// Configuración de CORS
app.use(cors());

// Configuración de Body Parser
app.use(bodyParser.json());

// Rutas de inicio de sesión y registro
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/landingpage', landingPageRoutes);
app.use('/contact', contactNotification);

// Manejo de CORS para todas las rutas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Iniciar el servidor
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

