"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = app.listen(3001, () => {
    console.log('server is running on port 3001');
});
const io = socketio(server);
const lobby = 'lobby';
const game = 'game';
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
});
//# sourceMappingURL=server.js.map