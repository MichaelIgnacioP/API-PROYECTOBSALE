// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, 'Dirección de correo inválida'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
