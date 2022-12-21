const mongoose = require('mongoose');
const { MessageSchema } = require('./Message');

const ChatSchema = new mongoose.Schema({
  users: [{ user_id: mongoose.Schema.Types.ObjectId }],
  messages: [{ type: MessageSchema }]
});

module.exports = mongoose.model('Chat', ChatSchema);
