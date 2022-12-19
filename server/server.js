const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// DOTENV
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

const io = new Server(server, {
  cors: {
    origin: 'http://192.168.1.18:19006'
  }
});

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://192.168.1.18:19006');
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

// Socket IO
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('new-message', (e) => {
    socket.to(e.chatId).emit('message-received', { message: e.message });
    console.log(`Message ${e.message} sent to ${e.chatId}`);
    console.log(e);

    socket.to(e.chatId).emit('receive-new-message', { msg: 'e.message' });
  });

  socket.on('enter-conversation', (e) => {
    socket.join(e.chatId);
    console.log(`${socket.id} has joined ${e.chatId}`);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
