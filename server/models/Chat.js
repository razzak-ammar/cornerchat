const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  users: [{ user_id: mongoose.Schema.Types.ObjectId }],
  messages: [
    {
      sender_name: { type: String, required: true },
      sender_id: { type: mongoose.Schema.Types.ObjectId },
      timestamp: { type: Date, default: Date.now, required: true },
      content: { type: String, required: true },
      type: { type: String, required: true },
      reactions: [{ reactor: { type: String }, reaction: { type: String } }]
    }
  ]
});

module.exports = mongoose.model('Chat', ChatSchema);
