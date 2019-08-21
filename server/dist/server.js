"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// Middleware
app.use(bodyparser.json());
app.use(cors());
//app.set("port", process.env.PORT || 3000);
const port = process.env.PORT || 5000;
// app.get("/", (req: any, res: any) => {
//   res.sendFile(path.resolve("./client/index.html"));
// });
io.on("connection", (socket) => {
    console.log("a user connected");
});
http.listen(port, () => {
    console.log(`listening on port ${port}`);
});
// const server = app.listen(port, () => {
//   console.log(`listening on ${port}`);
// });
//# sourceMappingURL=server.js.map