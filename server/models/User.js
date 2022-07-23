const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  chats: [
    {
      name: { type: String, required: true },
      chatId: { type: mongoose.Schema.Types.ObjectId, required: true },
      lastMessage: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
