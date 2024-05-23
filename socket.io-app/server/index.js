const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => socket.join(data));
  socket.on("send_message", (data) => {
    // socket.broadcast.emit("receive_message", data.message);
    socket.to(data.room).emit("receive_message", data.message);
  });
});

server.listen(5000, () => console.log("Server is running in port 5000"));
