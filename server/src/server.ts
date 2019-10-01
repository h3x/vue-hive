import * as express from 'express';
import * as socketio from 'socket.io';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from './models/user.model';
import Game from './models/game.model';
import {IUser, IUserShort, IGame} from '../../types';

import * as register from './routes/register'

dotenv.config()
const uri:string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`
mongoose.connect(uri, {useNewUrlParser: true}).catch(err => console.log(err));
mongoose.set('useCreateIndex', true);


const app = express();
const router = express.Router();
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({type:"*/*"}));


// app.use('/api/signup', register)

const postSignup = function(req: express.Request,res: express.Response){
  console.log(req.body.name)
  const newUser = new User({
      name: req.body.name,
      token: '',
      status: 'offline',
      password: bcrypt.hashSync(req.body.password, 10)
  });

  newUser.save(err => {
      if(err) {
              return res.status(400).json({ 
              title: 'error',
              code: 400,
              error: err.message 
          });
      }

      return res.status(200).json({
          title: 'Success'
      });
  })
}

const postLogin = function(req: express.Request,res: express.Response) {
  User.findOne({ name: req.body.name}, (err, user:IUser) => {
      if(err) return res.status(500).json({
          title: 'Server error',
          code: 500,
          error: err
      })
      if(!user) {
          return res.status(401).json({
              title: 'User not found',
              error: 'Invalid Credentials',
              code: 401
          })
      }

      // check password correct
      if(!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({
              title: 'Login failed',
              error: 'Invalid Credentials' 
          })
      } 
      //  if all checks pass      
      const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY);
      user.token = token;
      user.status = 'online';
      user.save()
      return res.status(200).json({
          title: 'success',
          token: token
        })
  
      })
}

const getUser = function(req: express.Request,res: express.Response) {
  const token = req.query.token as string; //token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded:{userId:string}) => {
    if (err) return res.status(403).json({
      title: 'unauthorized'
    })
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user:IUser) => {
      if (err) return console.log('error: ' + err)
      return res.status(200).json({
        title: 'user grabbed',
        user: user.name
      })
    }).catch(err => console.log('token error: ' + err))
  }) 
}

const getUsers = function(req: express.Request,res: express.Response) {
    //token is valid
    User.find({}, (err, users) => {
      if (err) return console.log(err)
      const u = users.map(user => { return { name: user.name, status: user.status } })
      return res.status(200).json({
         title: 'users grabbed',
         users: u
      })
    })
}

// TODO: this is where im up to
const getBoard = function(req: express.Request, res: express.Response) {
  Game.findOne({ game: req.query.game }, (err:any, game:IGame) => {
    if(err) console.log(err)
    else{
      return res.status(200).json({
        title: 'game data',
        gameBoard: game.moves[game.moves.length - 1],
      })
    }
})
}


const postLogout = function(req: express.Request,res: express.Response) {
  User.findOne({ name: req.body.name }, (err, user:IUser) => {
    if (err) return console.log(err)
    user.status = 'offline';
    user.save();
    return res.status(200).json({
      title: 'user logged out',
    })
  })
}

const gameFinished = function(req: express.Request, res: express.Response) {
  Game.findOne({ game: req.body.game }, (err: any, game: IGame) => {
    const player = req.body.player === 'black'? game.blackPlayer : game.blackPlayer;
    if(err) console.log(err)
    else{
      game.finished = true;
      game.winner = player;
      game.save();
      return res.status(200).json({
        title: 'game finished',
      })
    }
})
}

const getUnfinishedGames = function(req: express.Request, res: express.Response) {
  Game.find({}, (err: any, games) => {
    if(err) return res.status(500).json({title: 'Database error'})
    const info: any = [];
    games.filter( (el) => !el.finished && (el.whitePlayer === req.query.player || el.blackPlayer === req.query.player))
     .map(el =>  info.push({gameID: el.game, blackPlayer: el.blackPlayer, whitePlayer: el.whitePlayer, moves: el.moves}));
    
    return res.status(200).json({title: 'Current Games', games: info});
  })
}

const getAllGames = function(req: express.Request, res: express.Response) {
  Game.find({}, (err: any, games) => {
    if(err) return res.status(500).json({title: 'Database error'})
    const info: any = [];
    games.filter( (el) => (el.whitePlayer === req.query.player || el.blackPlayer === req.query.player))
     .map(el =>  info.push({gameID: el.game, blackPlayer: el.blackPlayer, whitePlayer: el.whitePlayer, winner: el.winner, finished: el.finished, moves: el.moves}));
    
    return res.status(200).json({title: 'All Games', games: info});
  })
}






const PORT = process.env.PORT || 3001;

const server = app.use("/", serveStatic ( path.join (__dirname, './../../client/dist') ) )
  .get("/api/user", (req: express.Request,res: express.Response) => getUser(req, res))
  .get("/api/users", getUsers)
  .get("/api/board", (req: express.Request,res: express.Response) => getBoard(req, res))
  .get("/api/unfinished", (req: express.Request,res: express.Response) => getUnfinishedGames(req, res))
  .get("/api/allGames", (req: express.Request,res: express.Response) => getAllGames(req, res))
  .post("/api/gameFinished", (req: express.Request, res: express.Response) => gameFinished(req, res))
  .post('/api/signup', (req: express.Request,res: express.Response) => postSignup(req, res))
  .post("/api/login", (req: express.Request,res: express.Response) => postLogin(req,res))
  .post("/api/logout", (req: express.Request,res: express.Response) => postLogout(req,res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketio(server);

const games:{room:string, players:number}[] =[]; 

io.on('connection', socket => {
  let clientID: string;
  
  socket.on('disconnect', () => {
    // TODO: do something cool here to set status to offline
    if (clientID)
      console.log(clientID + ' has disconeected')
    if(clientID)
      User.findOne({ name: clientID }, (err, user:IUser) => {
        if (err) return console.log(err)
        user.status = 'offline';
        user.save()
      })
    io.emit('logout');
  })

  // tell everyone there is a new user joining
  socket.on('newuser', data => {
    clientID = data;
    console.log(clientID + ' has connected')
    if(clientID)
      User.findOne({ name: clientID }, (err, user:IUser) => {
        if (err) return console.log(err)
        user.status = 'online';
        user.save()
      })
    socket.join(clientID);
    setTimeout(() => io.emit('newuser', data), 1000) // this is a filty dirty hack and i am ashamed of myself
    
  })

  // Subscribe to a room
  socket.on('subscribe', room => {
    socket.join(room);
  });

  mongoose.Model.exists = async function (options) {
    const result = await this.findOne(options).select("_id").lean();
    return result ? true : false;
  };

  // Subscribe to a game. Bless this mess.
  socket.on('subscribeGame', async (data: {room:string, player: string}) => {
    socket.join(data.room);

    // look up if game is already in play, next player is black
    const gameExists = await Game.exists({ game: data.room }); // returns true or false
    
    if(gameExists){
      Game.findOne({ game: data.room }, (err:any, game:IGame) => {
        if(err) console.log(err)
        else{
          if( game.blackPlayer === ''){
            game.blackPlayer = data.player; 
            game.save();
          }
          
        }
    })
    io.in(data.room).emit('player','B');
    }
    else{
      const newGame = new Game({
        game: data.room,
        whitePlayer: data.player,
        blackPlayer: '',
        moves: [],
        finished: false,
        winner: '',
      });

      newGame.save(err => {
        if(err) { console.log('Database error: ' + JSON.stringify(err)) }
      });
      
      io.in(data.room).emit('player','W')
    }
      
  })


  // send game room messages to the signed in room
  socket.on('sendmsg', data => {
    io.in(data.room).emit('msg', data);
  });

  // send invites to the user
  socket.on('invite', data => io.emit('inv',data) );

  socket.on('game', (data, room, player) =>{
    Game.findOneAndUpdate({game: room}, 
      {$push: {moves: {player, data}}},
      (res) => {
        io.in(room).emit('game',data, player);
      }

    )
  })

  socket.on('logout', (data) => setInterval(() => io.emit('logout', data.user), 1000 ) )

});
