const express = require('express');
const router = express.Router();
const ContactNotification = require('../models/contact');
const { validateFields } =  require('../helpers/validateFields')
const isAuthenticated = require('../middlewares/auth');

router.post('/', isAuthenticated, async (req, res) => {
  const { fullname, email, description } = req.body;

  const missingField = validateFields(req.body);
  if (missingField) {
    return res.status(400).json({ message: `Falta completar el campo "${missingField}"` });
  }

  try {
    const newNotification = new ContactNotification({
      fullname,
      email,
      description,
    });

    await newNotification.save();

    res.status(201).json({ message: 'Notificación de contacto almacenada exitosamente' });
  } catch (error) {
    console.error('Error al almacenar la notificación de contacto:', error);
    res.status(400).send('Error al almacenar la notificación de contacto');
  }
});

module.exports = router;
