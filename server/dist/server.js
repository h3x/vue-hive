"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const game_model_1 = require("./models/game.model");
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
    user_model_1.default.findOne({ name: req.body.name }, (err, user) => {
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
    const token = req.query.token; //token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(403).json({
                title: 'unauthorized'
            });
        //token is valid
        user_model_1.default.findOne({ _id: decoded.userId }, (err, user) => {
            if (err)
                return console.log('error: ' + err);
            return res.status(200).json({
                title: 'user grabbed',
                user: user.name
            });
        }).catch(err => console.log('token error: ' + err));
    });
};
const getUsers = function (req, res) {
    //token is valid
    user_model_1.default.find({}, (err, users) => {
        if (err)
            return console.log(err);
        //console.log(`decoded: ${users}`)
        const u = users.map(user => { return { name: user.name, status: user.status }; });
        return res.status(200).json({
            title: 'users grabbed',
            users: u
        });
    });
};
// TODO: this is where im up to
const getBoard = function (req, res) {
    game_model_1.default.findOne({ game: req.query.game }, (err, game) => {
        if (err)
            console.log(err);
        else {
            // console.log('moves is getBoard: ' + JSON.stringify(game.moves))
            return res.status(200).json({
                title: 'game data',
                gameBoard: game.moves[game.moves.length - 1],
            });
        }
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
const gameFinished = function (req, res) {
    game_model_1.default.findOne({ game: req.body.game }, (err, game) => {
        const player = req.body.player === 'black' ? game.blackPlayer : game.blackPlayer;
        if (err)
            console.log(err);
        else {
            game.finished = true;
            game.winner = player;
            game.save();
            return res.status(200).json({
                title: 'game finished',
            });
        }
    });
};
const getUnfinishedGames = function (req, res) {
    game_model_1.default.find({}, (err, games) => {
        if (err)
            return res.status(500).json({ title: 'Database error' });
        const info = [];
        games.filter((el) => !el.finished && (el.whitePlayer === req.query.player || el.blackPlayer === req.query.player))
            .map(el => info.push({ gameID: el.game, blackPlayer: el.blackPlayer, whitePlayer: el.whitePlayer, moves: el.moves }));
        return res.status(200).json({ title: 'Current Games', games: info });
    });
};
const PORT = process.env.PORT || 3001;
const server = app.use("/", serveStatic(path.join(__dirname, './../../client/dist')))
    .get("/api/user", (req, res) => getUser(req, res))
    .get("/api/users", getUsers)
    .get("/api/board", (req, res) => getBoard(req, res))
    .get("/api/unfinished", (req, res) => getUnfinishedGames(req, res))
    .post("/api/gameFinished", (req, res) => gameFinished(req, res))
    .post('/api/signup', (req, res) => postSignup(req, res))
    .post("/api/login", (req, res) => postLogin(req, res))
    .post("/api/logout", (req, res) => postLogout(req, res))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketio(server);
const games = [];
io.on('connection', socket => {
    let clientID;
    socket.on('disconnect', () => {
        // TODO: do something cool here to set status to offline
        if (clientID)
            console.log(clientID + ' has disconeected');
        if (clientID)
            user_model_1.default.findOne({ name: clientID }, (err, user) => {
                if (err)
                    return console.log(err);
                user.status = 'offline';
                user.save();
            });
        io.emit('logout');
    });
    // tell everyone there is a new user joining
    socket.on('newuser', data => {
        clientID = data;
        console.log(clientID + ' has connected');
        if (clientID)
            user_model_1.default.findOne({ name: clientID }, (err, user) => {
                if (err)
                    return console.log(err);
                user.status = 'online';
                user.save();
            });
        socket.join(clientID);
        setTimeout(() => io.emit('newuser', data), 1000); // this is a filty dirty hack and i am ashamed of myself
    });
    // Subscribe to a room
    socket.on('subscribe', room => {
        socket.join(room);
    });
    mongoose.Model.exists = function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOne(options).select("_id").lean();
            return result ? true : false;
        });
    };
    // Subscribe to a game. Bless this mess.
    socket.on('subscribeGame', (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(data.room);
        // look up if game is already in play, next player is black
        const gameExists = yield game_model_1.default.exists({ game: data.room }); // returns true or false
        if (gameExists) {
            game_model_1.default.findOne({ game: data.room }, (err, game) => {
                if (err)
                    console.log(err);
                else {
                    game.blackPlayer = data.player;
                    game.save();
                }
            });
            io.in(data.room).emit('player', 'B');
        }
        else {
            const newGame = new game_model_1.default({
                game: data.room,
                whitePlayer: data.player,
                blackPlayer: '',
                moves: [],
                finished: false,
                winner: '',
            });
            newGame.save(err => {
                if (err) {
                    console.log('Database error: ' + JSON.stringify(err));
                }
            });
            io.in(data.room).emit('player', 'W');
        }
    }));
    // send game room messages to the signed in room
    socket.on('sendmsg', data => {
        io.in(data.room).emit('msg', data);
    });
    // send invites to the user
    socket.on('invite', data => io.emit('inv', data));
    socket.on('game', (data, room, player) => {
        game_model_1.default.findOneAndUpdate({ game: room }, { $push: { moves: { player, data } } }, () => io.in(room).emit('game', data, player));
    });
    socket.on('logout', (data) => setInterval(() => io.emit('logout', data.user), 1000));
});
//# sourceMappingURL=server.js.map