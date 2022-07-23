const router = require('express').Router();
const { check, validationResult } = require('express-validator');

// @method      GET /chats
// @desc        Get the chats the user has
// @access      Private
router.get('/', (req, res) => {
  res.send('Here is everyone this user chats with...');
  // Either we store the last message, I guess we do that...
  // This should come from the user model I guess
});

// @method      POST /chats
// @desc        Create a new chat conversation
// @access      Private
router.post('/', (req, res) => {
  res.send('Your new conversation has been created');
  // Add it to the user model and add it to the chats database
});

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
