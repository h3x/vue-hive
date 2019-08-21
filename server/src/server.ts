import * as express from "express";
import * as bodyparser from "body-parser";
import * as cors from "cors";
import * as socketio from "socket.io";
import * as path from "path";


const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);


// Middleware
app.use(bodyparser.json());
app.use(cors());


const port = process.env.PORT || 5000;


io.on("connection", (socket: any) => {
  console.log("a user connected");
});

http.listen(port, () =>{
    console.log(`listening on port ${port}`)
})

