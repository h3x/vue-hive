import * as express from 'express';
import * as socketio from 'socket.io';
import * as serveStatic from 'serve-static';
import * as path from 'path';

const app = express();

//const server = require('http').Server(app)

const PORT = process.env.PORT || 3001;

// const server = express()
//   .use((req, res) => res.sendFile(path.resolve("./../../client/dist/index.html")) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const server = express()
  .use("/", serveStatic ( path.join (__dirname, './../../client/dist') ) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


// const server = app.listen(3001, () => {
//   console.log('server is running on port 3001')
// });

//app.use(express.static(__dirname + '../../client/dist'))

const io = socketio(server);
// const lobby = 'lobby';
// const game = 'game';
const games:{room:string, players:number}[] =[]; 


io.on('connection', socket => {


  // tell everyone there is a new user joining
  socket.on('newuser', data => {
    io.emit('newuser', data) // tell everyone there is a new user
  })

  // Subscribe to a room
  socket.on('subscribe', room => {
    socket.join(room);
  });

  // Subscribe to a game
  socket.on('subscribeGame', room => {
    socket.join(room);
    let player = 0;
    // decide who is balck and who is white then purge that game from the array
    for(let i = 0; i < games.length; i++){
        if(games[i].room === room){
          player = 1
          games.splice(i,1)
        }
    }
    if(player ===0)
      games.push({room:room, players:player})
    
    io.in(room).emit('player',['W','B'][player])
  });

  // send game room messages to the signed in room
  socket.on('sendmsg', data => {
    io.in(data.room).emit('msg', data);
  });

  // send invites to the user
  socket.on('invite', data => {
      io.emit('inv',data);
  });

  socket.on('game', (data, room, player) =>{
    io.in(room).emit('game',data, player)
  })

});
