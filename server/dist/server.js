"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketio = require("socket.io");
const serveStatic = require("serve-static");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const user_model_1 = require("./models/user.model");
dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`;
mongoose.connect(uri, { useNewUrlParser: true }).catch(err => console.log(err));
mongoose.set('useCreateIndex', true);
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "*/*" }));
// app.use('/api/signup', register)
const postSignup = function (req, res) {
    console.log(req.body.name);
    const newUser = new user_model_1.default({
        name: req.body.name,
        token: '',
        status: 'offline',
        password: bcrypt.hashSync(req.body.password, 10)
    });
    newUser.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                code: 400,
                error: err.message
            });
        }
        return res.status(200).json({
            title: 'Success'
        });
    });
};
const postLogin = function (req, res) {
    console.log('login');
    user_model_1.default.findOne({ name: req.body.name }, (err, user) => {
        console.log(user);
        if (err)
            return res.status(500).json({
                title: 'Server error',
                code: 500,
                error: err
            });
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: 'Invalid Credentials',
                code: 401
            });
        }
        // check password correct
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: 'Invalid Credentials'
            });
        }
        //  if all checks pass      
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        user.token = token;
        user.status = 'online';
        user.save();
        return res.status(200).json({
            title: 'success',
            token: token
        });
    });
};
const getUser = function (req, res) {
    const token = req.headers.token; //token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(401).json({
                title: 'unauthorized'
            });
        //token is valid
        console.log(`about to find one: ${JSON.stringify(decoded)}`);
        user_model_1.default.findOne({ _id: decoded.userId }, (err, user) => {
            if (err)
                return console.log('error: ' + err);
            console.log('username: ' + user.name);
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    name: user.name
                }
            });
        }).catch(err => console.log(err));
    });
};
const getUsers = function (req, res) {
    //token is valid
    user_model_1.default.find({}, (err, users) => {
        if (err)
            return console.log(err);
        //console.log(`decoded: ${users}`)
        const u = users.map(user => { return { name: user.name, status: user.status }; });
        console.log(u);
        return res.status(200).json({
            title: 'users grabbed',
            users: u
        });
    });
};
const postLogout = function (req, res) {
    user_model_1.default.findOne({ name: req.body.name }, (err, user) => {
        if (err)
            return console.log(err);
        user.status = 'offline';
        user.save();
        return res.status(200).json({
            title: 'user logged out',
        });
    });
};
const PORT = process.env.PORT || 3001;
const server = app.use("/", serveStatic(path.join(__dirname, './../../client/dist')))
    .get("/api/user", getUser)
    .get("/api/users", getUsers)
    .post('/api/signup', (req, res) => postSignup(req, res))
    .post("/api/login", (req, res) => postLogin(req, res))
    .post("/api/logout", (req, res) => postLogout(req, res))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketio(server);
const games = [];
io.on('connection', socket => {
    // tell everyone there is a new user joining
    socket.on('newuser', data => {
        io.emit('newuser', data);
    });
    // Subscribe to a room
    socket.on('subscribe', room => {
        socket.join(room);
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
        io.in(data.room).emit('msg', data);
    });
    // send invites to the user
    socket.on('invite', data => {
        io.emit('inv', data);
    });
    socket.on('game', (data, room, player) => {
        io.in(room).emit('game', data, player);
    });
    socket.on('logout', (data) => {
        console.log('disconnected');
        io.emit('logout', data.user);
    });
});
//# sourceMappingURL=server.js.map