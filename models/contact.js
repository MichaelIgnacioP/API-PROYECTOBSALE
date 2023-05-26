const mongoose = require('mongoose');

const contactNotificationSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
});

const ContactNotification = mongoose.model('ContactNotification', contactNotificationSchema);

module.exports = ContactNotification;
