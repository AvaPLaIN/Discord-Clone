require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const io = require('socket.io')(5000, {
  cors: {
    origin: '*',
  },
});

connectDB();
const app = express();

//! IMPORT ROUTES
const authRoute = require('./routes/auth');
const serverRoute = require('./routes/server');

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoute);
app.use('/api/server', serverRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 8800;

const server = app.listen(PORT, () =>
  console.log(`Server running on Port: ${PORT}`)
);

process.on('unhandledRejection', (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});

let serverUsers = [];
let roomUsers = [];

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('joinRoom', ({ userId, roomId }) => {
    console.log(`user ${userId} joined Room ${roomId}`);
    // const user = {
    //   userId,
    //   roomId,
    //   id: socket.id,
    // };
    // console.log(user);
    socket.join(roomId);
    // roomUsers.push(user);
    io.emit('userJoinedRoom', userId);
  });

  socket.on('leaveRoom', ({ userId, roomId }) => {
    socket.leave(roomId);
  });

  socket.on('addMessage', ({ message, roomId }) => {
    console.log(`user sent a message ${message} to Room ${roomId}`);
    io.to(roomId).emit('newMessage', message.data);
  });
});
