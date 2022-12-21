const Chat = require('../models/Chat');
const User = require('../models/User');
const { MessageModel } = require('../models/Message');

exports.sendMessageController = async ({
  chatId,
  message,
  senderId,
  sender
}) => {
  let current_chat = await Chat.findById(chatId);
  console.log('we are in....' + current_chat._id);
  if (!current_chat) {
    console.error("Message Controller: Chat provided doesn't exist");
  }

  let new_message = new MessageModel({
    sender_name: sender,
    sender_id: senderId,
    timestamp: Date.now(),
    content: message,
    type: 'text'
  });

  await current_chat.messages.push(new_message);
  current_chat.save();
  return new_message;
};
