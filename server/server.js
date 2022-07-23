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
    origin: 'localhost:19006/'
  }
});

// Body Parser
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:19006');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/auth', require('./routes/Auth'));

// Socket IO
io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
