"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = app.listen(3001, () => {
    console.log('server is running on port 3001');
});
const io = socketio(server);
// const lobby = 'lobby';
// const game = 'game';
const games = [];
io.on('connection', socket => {
    console.log(`new connection: ${socket.id}`);
    // tell everyone there is a new user joining
    socket.on('newuser', data => {
        io.emit('newuser', data); // tell everyone there is a new user
        console.log(`newuser ${data}`);
    });
    // Subscribe to a room
    socket.on('subscribe', room => {
        socket.join(room);
        console.log(`new subscription to: ${room}`);
    });
    // Subscribe to a game
    socket.on('subscribeGame', room => {
        socket.join(room);
        let player = 0;
        // decide who is balck and who is white then purge that game from the array
        for (let i = 0; i < games.length; i++) {
            if (games[i].room === room) {
                player = 1;
                games.splice(i, 1);
            }
        }
        if (player === 0)
            games.push({ room: room, players: player });
        io.in(room).emit('player', ['W', 'B'][player]);
    });
    // send game room messages to the signed in room
    socket.on('sendmsg', data => {
        console.log(`sendmsg server: ${JSON.stringify(data)}`);
        //io.emit('msg', data)
        io.in(data.room).emit('msg', data);
    });
    // send invites to the user
    socket.on('invite', data => {
        io.emit('inv', data);
        console.log(`user: ${data.user}, message: ${JSON.stringify(data.message)}`);
    });
    socket.on('game', (data, room, player) => {
        console.log(`SERVER RECIEVEING: ${room}`);
        io.in(room).emit('game', data, player);
    });
});
//# sourceMappingURL=server.js.map