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
import User from './models/user.model'
import {IUser} from '../../types'

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
  console.log('login')
  User.findOne({ name: req.body.name}, (err, user:IUser) => {
    console.log(user)
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
  const token = req.headers.token as string; //token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded:{userId:string}) => {
    if (err) return res.status(401).json({
      title: 'unauthorized'
    })
    //token is valid
    console.log(`about to find one: ${JSON.stringify(decoded)}`)
    User.findOne({ _id: decoded.userId }, (err, user:IUser) => {
      if (err) return console.log('error: ' + err)
      console.log('username: ' + user.name)
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          name: user.name
        }
      })
    }).catch(err => console.log(err))
  }) 
}

const getUsers = function(req: express.Request,res: express.Response) {
    //token is valid
    User.find({}, (err, users) => {
      if (err) return console.log(err)
      //console.log(`decoded: ${users}`)
      const u = users.map(user => { return { name: user.name, status: user.status } })
      console.log(u)
      return res.status(200).json({
         title: 'users grabbed',
         users: u
      })
    })
}

const postLogout = function(req: express.Request,res: express.Response) {
  User.findOne({ name: req.body.name }, (err, user:IUser) => {
    if (err) return console.log(err)
    user.status = 'offline';
    user.save()
    return res.status(200).json({
      title: 'user logged out',
    })
  })
}




const PORT = process.env.PORT || 3001;

const server = app.use("/", serveStatic ( path.join (__dirname, './../../client/dist') ) )
  .get("/api/user", getUser)
  .get("/api/users", getUsers)
  .post('/api/signup', (req: express.Request,res: express.Response) => postSignup(req, res))
  .post("/api/login", (req: express.Request,res: express.Response) => postLogin(req,res))
  .post("/api/logout", (req: express.Request,res: express.Response) => postLogout(req,res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketio(server);

const games:{room:string, players:number}[] =[]; 


io.on('connection', socket => {

  // tell everyone there is a new user joining
  socket.on('newuser', data => {
    io.emit('newuser', data)
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

  socket.on('logout', (data) => {
    console.log('disconnected')
    io.emit('logout', data.user)
  })

});
