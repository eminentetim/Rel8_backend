const socketIO = require('socket.io');
const GroupMessage = require('../models/GroupMessage');

let io;

const init = (server) => {
  io = socketIO(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('groupMessage', async (data) => {
      const message = new GroupMessage({
        content: data.content,
        senderId: data.senderId,
        orgId: data.orgId,
      });
      await message.save();
      io.emit('groupMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

module.exports = {
  init,
  getIO,
};
