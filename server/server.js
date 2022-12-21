const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');

const { checkAuth } = require('./middleware/authSocket');
const {
  sendMessageController
} = require('./controllers/sendMessageController');

// DOTENV
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

const io = new Server(server, {
  cors: {
    origin: `${process.env.SERVER_URL}:19006`
  }
});

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', `${process.env.SERVER_URL}:19006`);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/auth', require('./routes/Auth'));
app.use('/api/chats', require('./routes/Chats'));

// Socket IO Middleware
io.use(async (socket, next) => {
  const result = checkAuth(socket.handshake.auth.token);
  if (result.result.result == true) {
    console.log('SocketIO: A token was provided before connection');
    next();
  } else {
    console.log('SocketIO: No token was provided before connection');
    const err = new Error('not authorized');
    next(err);
  }
});

// Socket IO
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('new-message', async (e) => {
    console.log('got a new message to deal with');
    const new_message = await sendMessageController({
      chatId: e.chatId,
      message: e.message,
      sender: e.sender,
      senderId: e.sender_id
    });

    socket.to(e.chatId).emit('receive-new-message', new_message);
  });

  socket.on('enter-conversation', (e) => {
    socket.join(e.chatId);
    console.log(`${socket.id} has joined ${e.chatId}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, (e) => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
