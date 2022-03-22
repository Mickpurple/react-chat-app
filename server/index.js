const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server, Socket } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://mickpurple.com",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("user connected " + socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected ", socket.id);
    });
    socket.on("joinRoom", (data) => {
        socket.join(data);
        console.log("user "+socket.id+" joined room "+data);
    });
    socket.on("sendMessage", (data) => {
        socket.to(data.room).emit("receiveMessage", data);
    })
});

server.listen(3001, function() {
    console.log("server started on port 3001");
});