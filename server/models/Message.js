const mongoose = require('mongoose');

exports.MessageSchema = new mongoose.Schema({
  sender_name: { type: String, required: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId },
  timestamp: { type: Date, default: Date.now(), required: true },
  content: { type: String, required: true },
  type: { type: String, required: true },
  reactions: [{ reactor: { type: String }, reaction: { type: String } }]
});

exports.MessageModel = mongoose.model('message', this.MessageSchema);
