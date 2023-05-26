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
app.use('/api', cors());

// Configuración de Body Parser
app.use(bodyParser.json());

// Rutas de inicio de sesión y registro
// app.use('/login', loginRoutes);
// app.use('/register', registerRoutes);
// app.use('/landingpage', landingPageRoutes);
// app.use('/contact', contactNotification);


// Manejo de CORS para todas las rutas
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
//   });

  // Configuración de CORS
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

app.use('/login', allowCors(loginRoutes));
app.use('/register', allowCors(registerRoutes));
app.use('/landingpage', allowCors(landingPageRoutes));
app.use('/contact', allowCors(contactNotification));

// Iniciar el servidor
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

