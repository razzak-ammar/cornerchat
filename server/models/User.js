const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    required: true
  },
  email: {
    required: true
  },
  password: {
    required: true
  },
  username: {
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
