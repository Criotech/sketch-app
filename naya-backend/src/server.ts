import * as http from 'http';
// import * as socketio from 'socket.io';
import { Server } from 'socket.io';
import app from './app';
import logger from './config/logger';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

const PORT = 5200;

io.on('connection', (socket) => {
  socket.on('create', (room) => {
    socket.join(room);
  });
  socket.on('canvas-data', (data) => {
    socket.to(data.room).emit('canvas-data', data.canvas);
  });
});

server.listen(PORT, () => {
  logger.info(`listening on port: ${PORT}`);
});
