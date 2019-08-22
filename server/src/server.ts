import * as express from 'express';
import * as socketio from 'socket.io';

const app = express();

const server = app.listen(3001, () => {
  console.log('server is running on port 3001')
});

const io = socketio(server);
const lobby = 'lobby';
const game = 'game';

io.on('connection', socket => {
  console.log(`new connection: ${socket.id}`);

  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', room => {
    socket.join(room);
  });

  socket.on('sendmsg' + lobby, data => {
    console.log(data)
    io.in(lobby).emit('msg', data);
  });

  socket.on('sendmsg' + game, data => {
    console.log(data)
    io.in(game).emit('msg', data);
  });
});