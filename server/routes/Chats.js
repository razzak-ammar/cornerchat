const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Chat = require('../models/Chat');
const User = require('../models/User');
const private = require('../middleware/private');

// @method      GET /chats
// @desc        Get the chats the user has
// @access      Private
router.get('/', private, async (req, res) => {
  try {
    const user_chats = await User.findById(req.user.id).select('chats');
    return res.status(200).json({
      success: true,
      message: 'Here',
      data: user_chats
    });
  } catch (err) {
    console.log(err);
  }
});

// @method      POST /chats
// @desc        Create a new chat conversation
// @access      Private
router.post(
  '/',
  private,
  check('receiver', 'To whom this conversation is being created with')
    .exists()
    .isEmail(),
  check('firstMessage', 'What is your first message?').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { receiver, firstMessage } = req.body;

      // Add it to the user model and add it to the chats database

      const currentUser = await User.findById(req.user.id).select('-password');
      console.log('== CurrentUser ==');
      console.log(currentUser);
      const other_user = await User.findOne({ email: receiver }).select(
        '-password'
      );

      console.log('== OtherUser ==');
      console.log(other_user);

      // Check if chat exists
      if (currentUser.chats.some((chat) => chat.usersEmail === receiver)) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: 'Chat already exists :)' }]
        });
      }

      // Create a new chat
      const newChat = new Chat({});

      newChat.users[0] = currentUser.id;
      newChat.users[1] = other_user.id;

      newChat.messages.push({
        sender_name: currentUser.name,
        sender_id: currentUser._id,
        content: firstMessage,
        type: 'text'
      });

      // Add to user who wanted the chat created

      let current_user_new_chat = {
        name: other_user.name,
        usersEmail: other_user.email,
        chatId: newChat._id, // we'll add later from new chat created
        lastMessage: firstMessage
      };

      currentUser.chats.push(current_user_new_chat);

      // Add to the other user's array
      let other_new_user_chat = {
        name: currentUser.name,
        usersEmail: currentUser.email,
        chatId: newChat._id,
        lastMessage: firstMessage
      };

      other_user.chats.push(other_new_user_chat);

      // Save all changes and creations
      await currentUser.save();
      await other_user.save();
      await newChat.save();

      return res.status(200).json({
        success: true,
        message: 'Chat successfully created :)'
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// @method      DELETE
// @desc        Delete a chat conversation
// @access      Private
router.delete('/', (req, res) => {
  res.send('Your conversation has been deleted from our database');
});

// @method      GET /chat/:chatId
// @desc        Get a specific chat of the user
// @access      Private
router.get('/:chatId', (req, res) => {
  res.send('Here is the specific persons chat you want');
});

// @method      POST /chat/:id
// @desc        Add a message to the chat conversation
// @access      Private
router.post('/', (req, res) => {
  res.send(
    'Looks like you are out of luck... I added a new message for you in the chat conversation'
  );
});

module.exports = router;
